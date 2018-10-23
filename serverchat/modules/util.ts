module JMath {
    var fs = require('fs');
    var bcrypt = require('bcrypt-nodejs');
    var ObjectID = require('mongoskin').ObjectID;

    export class Util implements IUtil {
        /**
       * @setObjectId
       * @param cookiesData
       */
        public setObjectId(obj: any): any {
            for (var p in obj) {
                if (typeof obj[p] !== 'object') continue;
                if (obj[p].isObjectId === true) {
                    var val = obj[p].val;
                    if (/[\w\d]{24}/.test(val[0])) {
                        for (var i = 0; i < val.length; i++) {
                            val[i] = new ObjectID(val[i]);
                        }
                        obj[p] = obj[p].val;
                    } else {
                        obj[p] = new ObjectID(val);
                    }
                } else {
                    this.setObjectId(obj[p]);
                }
            }
        }
        /**
        * @parseJson
        * @param cookiesData
        */
        public parseJson(json: string): any {
            return eval('[' + json + ']')[0];
        }
        /**
         * @readJson
         * @param cookiesData
         */
        public readJson(filePath: string): void {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    global.logger.error(err);
                    return;
                }
                return this.parseJson(data);
            });
        }
        /**
         * @readFile
         * @param cookiesData
         */
        public readFile(filePath: string, cb?: { (data: string): void }) {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    global.logger.error(err);
                    return;
                }
                if (typeof cb === "function")
                    cb(data);
            });
        }
        /**
          * @breakTextArea
          * @param cookiesData
          */
        public breakTextArea(str: string): string {
            var text = str.replace(/\r?\n/g, '<br />');
            var parse = text.split("<br />");
            var txt = [];
            for (var i = 0; i < parse.length; i++) {
                txt[i] = '<p>' + parse[i] + '</p>';
            }
            var stxt = txt.join("");
            return stxt;
        }
        /**
          * @capitalizeFirstLetterOfWord
          * @param cookiesData
          */
        public capitalizeFirstLetterOfWord(val: string): string {
            if (val.indexOf('-') == -1) {
                return val.charAt(0).toUpperCase() + val.slice(1);
            } else {
                var result = '';
                var tmpArr = val.split('-');
                for (var i in tmpArr) {
                    result += tmpArr[i][0].toUpperCase() + tmpArr[i].slice(1);
                }
                return result;
            }
        }
        /**
          * @random
          * @param cookiesData
          */
        public stringFormat(source: string, ...args: any[]): string {
            return source.replace(/{(\d+)}/g, (match, number) => typeof args[number] != 'undefined'
                ? args[number]
                : match);
        }
        /**
          * @random
          * @param cookiesData
          */
        public random(low: number, high: number): number {
            return Math.random() * (high - low) + low;
        }
        /**
         * @cookieParser
         * @param cookiesData
         */
        public cookieParser(data: string): Object {
            var result = {};
            var params = data.split(';');
            for (var i in params) {
                var keyValuePair = params[i].split('=');
                result[keyValuePair[0].replace(/ /, '')] = keyValuePair[1];
            }
            return result;
        }
        /**
         * @getSession
         * @param cookiesData
         */
        public getSession(req, cb: { (err, sessionData: any): void }): void {
            var sessionId = this.getSessionId(req.headers.cookie);
            global.redisClient.get('sess:' + sessionId, cb);
        }
        /**
         * @getSessionId
         * @param cookiesData
         */
        public getSessionId(params: any): string {
            var sid = params.sessionid;
            return sid;
        }
        /**
         * @validateEmail
         * @param email
         */
        public validateEmail(email: string): boolean {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (filter.test(email)) return true;
            else return false;
        };
        /**
         * @isLoggedIn
         * @param req
         * @param res
         * @param next
         */
        public isLoggedIn(req, res, next): void {
            global.logger.trace('util.isLoggedIn called');
            // if user is authenticated in the session, carry on 
            if (req.isAuthenticated()) {
                next();
            } else {
                // if they aren't redirect them to the home page
                res.redirect('/manager/login');
            }
        }
        /**
         * @setAlias
         * @param str
         */
        public setAlias(str: string): string {
            if (!global.util.isNullOrUndefined(str) && !global.util.isEmpty(str)) {
                var slug = global.util.removeSign(str, true);
                slug = slug
                    //Đổi khoảng trắng thành ký tự gạch ngang
                    .replace(/ /gi, "-")
                    //Xóa các ký tự đặt biệt
                    .replace(/[^a-z0-9\-]/gi, '')
                    //Nếu có từ 2 gạch ngang liên tiếp trở len thì chuyển thành 1
                    .replace(/-{2,}/gi, "-");
                return slug;
            } else {
                return;
            }
        }
        /**
         * @removeSign
         * @param str
         * @param isLowerCase
         */
        public removeSign(str, isLowerCase: any): string {
            if (isLowerCase) {
                str = str.toLowerCase();
            } else {
                str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰÁẶẲẴ]/g, "A")
                    .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E")
                    .replace(/[ÌÍỊỈĨ]/g, "I")
                    .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O")
                    .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, "U")
                    .replace(/[ỲÝỴỶỸ]/g, "Y")
                    .replace(/[Đ]/g, "D");
            }
            str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
                .replace(/[èéẹẻẽêềếệểễ]/g, "e")
                .replace(/[ìíịỉĩ]/g, "i")
                .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
                .replace(/[ùúụủũưừứựửữ]/g, "u")
                .replace(/[ỳýỵỷỹ]/g, "y")
                .replace(/[đ]/g, "d");
            return str;
        }
        /**
         * @removeNullProperties
         * @param val
         */
        public removeNullProperties(val: any): any {
            for (var i in val) {
                var p = val[i];
                if (this.isNullOrUndefined(p)) {
                    delete val[i];
                } else if (this.isArray(p)) {
                    for (var j in p) {
                        p[j] = this.removeNullProperties(p[j]);
                    }
                } else if (this.isObject(p)) {
                    val[i] = this.removeNullProperties(p);
                }
            }
        }
        /**
         * @isEmpty
         * @param str
         */
        public isEmpty(str: any): boolean {
            return str === '';
        }
        /**
         * @isArray
         * @param thing
         */
        public isArray(thing: any): boolean {
            var getType = {};
            return thing && getType.toString.call(thing) === '[object Array]';
        }
        /**
         * @isString
         * @param thing
         */
        public isString(thing: any): boolean {
            var getType = {};
            return thing && getType.toString.call(thing) === '[object String]';
        }
        /**
         * @isObject
         * @param thing
         */
        public isObject(thing: any): boolean {
            var getType = {};
            return thing && getType.toString.call(thing) === '[object Object]';
        }
        /**
         * @isNumber
         * @param thing
         */
        public isNumber(thing: any): boolean {
            var getType = {};
            return thing && getType.toString.call(thing) === '[object Number]';
        }
        /**
         * @isBoolean
         * @param thing
         */
        public isBoolean(thing: any): boolean {
            var getType = {};
            return thing && getType.toString.call(thing) === '[object Boolean]';
        }
        /**
         * @isFunction
         * @param thing
         */
        public isFunction(thing: any): boolean {
            var getType = {};
            return thing && getType.toString.call(thing) === '[object Function]';
        }
        /**
         * @isNullOrUndefined
         * @param obj
         */
        public isNullOrUndefined(obj): boolean {
            return obj === undefined || obj == null;
        }
        /**
         * @isValidObjectId
         * @param obj
         */
        public isValidObjectId(obj: any): boolean {
            if (!global.util.isNullOrUndefined(obj) && obj.length == 24)
                return /^[0-9a-fA-F]+$/.test(obj);
            return false;
        }
        /**
         * @generateHash
         * @param password
         */
        public generateHash(password: string): string[] {
            var salt = bcrypt.genSaltSync(8);
            return [bcrypt.hashSync(password, salt, null), salt];
        }
        /**
         * @createPasswordRandom
         * @param email
         * @param pwd
         */
        public createPasswordRandom(email, pwd): string {
            var crypto = require("crypto");
            var pwds = crypto.createHash('md5').update(email + pwd).digest('hex');
            return pwds;
        }
        /**
         * @getMd5
         * @param str
         */
        public getMd5(str): string {
            var crypto = require("crypto");
            var pwds = crypto.createHash('md5').update(str).digest('hex');
            return pwds;
        }
        /**
         * @getIpAddress
         */
        public getIpAddress(): string {
            var ip = require('ip');
            return ip.address();
        }
        /**
         * @getIpClient
         */
        public getIpClient(): string {
            var ip = '0.0.0.0';
            var interfaces = require('os').networkInterfaces();
            for (var devName in interfaces) {
                var iface = interfaces[devName];

                for (var i = 0; i < iface.length; i++) {
                    var alias = iface[i];
                    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                        ip = alias.address;
                        break;
                    }
                }
            }
            return ip;
        }
        /**
         * @validPassword
         * @param password
         * @param hashedPassword
         */
        public validPassword(password: string, hashedPassword: string): boolean {
            return bcrypt.compareSync(password, hashedPassword);
        }
        /**
         * @isObjectId
         * @param id
         */
        public isObjectId(id: string): boolean {
            return !this.isNullOrUndefined(id) && /^[a-f0-9]{24}$/i.test(id);
        }
        /**
         * @randomString
         * @param ilength
         */
        public randomString(ilength: number): string {
            var crypto = require('crypto');
            /** Sync */
            function randomString(length, chars) {
                if (!chars) {
                    throw new Error('Argument \'chars\' is undefined');
                }

                var charsLength = chars.length;
                if (charsLength > 256) {
                    throw new Error('Argument \'chars\' should not have more than 256 characters' + ', otherwise unpredictability will be broken');
                }

                var randomBytes = crypto.randomBytes(length);
                var result = new Array(length);

                var cursor = 0;
                for (var i = 0; i < length; i++) {
                    cursor += randomBytes[i];
                    result[i] = chars[cursor % charsLength];
                };

                return result.join('');
            }

            /** Sync */
            function randomAsciiString(length) {
                return randomString(length, 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789');
            }

            return randomAsciiString(ilength);
        }
    }
}

module.exports = new JMath.Util();
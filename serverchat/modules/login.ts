var path = require('path');
module JMath {
    export class JLogin {
        //
        public validateEmail(email) {
            var validator = require("email-validator");
            var isMail = validator.validate(email);
            if (!isMail) {
                return false;
            }
            return true;
        }
        public validatePassword(email, password, cb?: { (err, docs: any[]): void }): void {
            var pwd = global.util.createPasswordRandom(email, password);
            var params = { email: email, pwd: pwd };
            global.db.callFunc('validatePassword',
                [params],
                (error, result) => {
                    if (global.util.isNullOrUndefined(result)) global.logger.error('JLogin.validate->', error);
                    if (typeof cb === "function") {
                        cb(error, result);
                    }
                });
        }
        //
        public validateUserLogin(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.info('JLogin.checkLogin...');
            var pwd = global.util.createPasswordRandom(params.user.email, params.user.pwd);
            var apikey = global.util.createPasswordRandom(params.user.email, params.domain);
            var secretId = global.util.createPasswordRandom(params.user.domain, params.domain);
            var keyCheck = global.util.createPasswordRandom(secretId, apikey);
            params.keyCheck = keyCheck;
            params.ip = global.util.getIpClient();
            params.ipclient = params.ipClientId == undefined ? "" : global.util.getIpClient();
            params.ipserver = global.util.getIpAddress();
            params.pwd = pwd;
            //global.logger.info('JLogin.checkLogin...params==>', pwd, keyCheck);
            global.db.callFunc('validateUserLogin',
                [params],
                (error, result) => {
                    if (global.util.isNullOrUndefined(result)) error = 1;
                    if (typeof cb === "function") {
                        cb(error, result);
                    }
                });
        }
        //validateUserServerLogin
        //
        public validateUserServerLogin(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.info('JLogin.validateUserServerLogin...');//, params.user);
            var pwd = global.util.createPasswordRandom(params.user.email, params.user.pwd);
            var apikey = global.util.createPasswordRandom(params.user.email, params.domain);
            var secretId = global.util.createPasswordRandom(params.user.domain, params.domain);
            var keyCheck = global.util.createPasswordRandom(secretId, apikey);
            params.keyCheck = keyCheck;
            params.ip = global.util.getIpClient();
            params.ipclient = params.ipClientId == undefined ? "" : global.util.getIpClient();
            params.ipserver = global.util.getIpAddress();
            params.pwd = pwd;
           // global.logger.info('JLogin.validateUserServerLogin...params==>', pwd, params.keyCheck);
            global.db.callFunc('validateUserServerLogin',
                [params],
                (error, result) => {
                    // global.logger.debug('JLogin.validateUserServerLogin...params==>,result:', result);
                    if (global.util.isNullOrUndefined(result)) error = 1;
                    if (typeof cb === "function") {
                        cb(error, result);
                    }
                });
        }
        //
        public setMenuItem(data, sid): void {
            if (!global.util.isNullOrUndefined(data)) {
                // global.logger.info('jobHeader:results....data.....');
                var k = 0;
                data.forEach(function (row) {
                    var parentkey = row.newkey;
                    var appMenuItem = parentkey + sid;
                    global.cache.set(appMenuItem, row);
                    global.cache.expire(appMenuItem, global.config.cacheInfo.apptimecache);
                    //global.logger.info(k + '.' + appMenuItem, row);
                   // global.logger.info('-----------------------------------------------------------');
                    if (row.components != undefined && row.components != '' && row.components.length > 0) {
                        var ki = 1;
                        row.components.forEach(function (rows) {
                            var subparent = rows.newkey;
                            var appMenuItems = subparent + sid;                           
                            global.cache.set(appMenuItems, rows);
                            global.cache.expire(appMenuItems, global.config.cacheInfo.apptimecache);
                            //----------------
                           // global.logger.info(k + '.' + ki + '.' + appMenuItems, rows);
                           // global.logger.info('-----------------------------------------------------------');
                            if (rows.childrens != undefined && rows.childrens != '' && rows.childrens.length>0) {
                                var kj = 1;
                                rows.childrens.forEach(function (rowsc) {
                                    var appMenuItemsc = rowsc.newkey + sid;
                                    global.cache.set(appMenuItemsc, rowsc);
                                    global.cache.expire(appMenuItemsc, global.config.cacheInfo.apptimecache);
                                  //  global.logger.info(k + '.' + ki + '.' + kj + '. ' + appMenuItemsc, rowsc);
                                  //  global.logger.info('-----------------------------------------------------------');
                                });
                            }
                            ki++;
                        });
                    }
                    k++;
                });
            }
        }
        /**
         *  @setAppComponentRoot
         * @param data
         * @param sid
         */
        public setAppComponentRoot(data, sid): void {
            data = data == undefined ? null : data;
            if (!global.util.isNullOrUndefined(data)) {
                //   global.logger.info('jobHeader:results....data.....', data);
                data.forEach(function (row) {
                    var appMenuItems = row.newkey + sid;
                    global.cache.set(appMenuItems, row);
                    global.cache.expire(appMenuItems, global.config.cacheInfo.apptimecache);
                });
            }
        }
        /**
         * 
         * @param data
         * @param sid
         */
        public setAppItem(data, sid): void {
            data = data == undefined ? null : data;
            if (!global.util.isNullOrUndefined(data)) {
                //   global.logger.info('jobHeader:results....data.....', data);
                data.forEach(function (row) {
                    var listApps = row.childrens;
                    if (!global.util.isNullOrUndefined(listApps)) {
                        listApps.forEach(function (rows) {
                            var appMenuItems = rows.newkey + sid;
                            global.cache.set(appMenuItems, rows);
                            global.cache.expire(appMenuItems, global.config.cacheInfo.apptimecache);
                        });
                    }
                });
            }
        }
        //
        //getUserInfoLogin
        public getUserInfoLogin(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.info('JLogin.getUserInfoLogin...');
            //global.logger.trace('JLogin.checkLogin...params==>', params);
            global.db.callFunc('getUserInfoLogin',
                [params],
                (error, result) => {
                    if (global.util.isNullOrUndefined(result)) error = 1;
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }

        //
        public getUserApps(user, cb?: { (err, docs: any[]): void }): void {
            global.logger.info('JLogin.getApps...');
            global.db.callFunc('getUserApps',
                [user],
                (error, result) => {
                    // global.logger.info('getApps.result==>', result);
                    if (global.util.isNullOrUndefined(result)) error = 1;
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /*
        *@public registerCustomer
        * params params
        * callback true
        */
        public registerCustomer(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.info('JLogin.registerCustomer...');
            var pwd = global.util.createPasswordRandom(params.data.email, params.data.pwd);
            var apikey = global.util.createPasswordRandom(params.data.email, params.domain);
            var secretId = global.util.createPasswordRandom(params.data.domain, params.domain);
            var keyCheck = global.util.createPasswordRandom(secretId, apikey);
            params.data.keyCheck = keyCheck;
            params.data.ip = global.util.getIpClient();
            params.data.ipclient = params.ipClientId == undefined ? "" : global.util.getIpClient();
            params.data.ipserver = global.util.getIpAddress();
            params.data.secretId = secretId;
            params.data.apiKey = apikey;
            params.data.pwd = pwd;
            global.db.callFunc('registerCustomer', [params], (error, result) => {     
                if (global.util.isNullOrUndefined(result)) global.logger.error('JLogin.registerCustomer->', error);
                if (typeof cb === "function")
                    cb(error, result);
            });
        }
        /*
       *@public guestLogin
       * params params
       * callback true
       */
        public guestLogin(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.info('JLogin.guestLogin...');
            global.db.callFunc('guestLogin',
                [params],
                (error, result) => {
                    if (global.util.isNullOrUndefined(result)) error = 1;
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //
        public JLogout(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JLogin.JLogout...');
            params.ip = global.util.getIpClient();
            params.ipclient = params.ipClientId;
            params.ipserver = global.util.getIpAddress();
            global.db.callFunc('JLogout',
                [params],
                (error, result) => {
                    //global.logger.info("login--->", result);
                    if (error) global.logger.error('JLogin.JLogout->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * 
         * @param params
         * @param apps
         */
        public setApp(params, apps) {
            if (!global.util.isNullOrUndefined(apps)) {
                var keycache = global.cache.createUserKey('userApps' + params.sessionid);
                global.cache.set(keycache, apps);
                global.cache.expire(keycache, global.config.cacheInfo.usertimecache);
            }
        }
        /**
         *  setUser
         * @param params
         * @param user
         */
        public setUser(params, user): void {
            if (!global.util.isNullOrUndefined(user)) {
                var keycache = global.cache.createUserKey('userlogin' + params.sessionid);
                global.cache.set(keycache, user);
                global.cache.expire(keycache, global.config.cacheInfo.usertimecache);
            }
        }
        /**
         * @getUsers
         * @param params
         * @param cb
         */
        public getUsers(params, cb?: { (docs: {}): void }): void {
            var keycache = global.cache.createUserKey('userlogin' + params.sessionid);
            global.cache.get(keycache, (err, result) => {
                global.logger.info("get user from cache=>", result);
                if (result != undefined && result != 'undefined' && result != '' && result != null && result != 'null') {
                    //global.logger.info("user:Login...type.result===>", typeof result);
                    if (typeof result == 'string') {
                        result = JSON.parse(result);
                    }
                } else {
                    result = null;
                }
                if (typeof cb == 'function') cb(result);
            });
        }
        /**
       * @checkApikey
       * @param params
       * @param cb
       */
        public checkApikey(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.debug('JUserModelLogin.checkApikey...');
            params.ip = global.util.getIpClient();
            params.ipclient = params.ipClientId;
            params.ipserver = global.util.getIpAddress();
            global.db.callFunc('checkApikey',
                [params],
                (error, result) => {
                    //global.logger.info("checkApikey--->", result);
                    if (error) global.logger.error('JUserModelLogin.checkApikey->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * @verifyApikey
         * @param params
         * @param cb
         */
        public verifyApikey(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JUserModelLogin.verifyApikey...');
            global.db.callFunc('verifyApikey',
                [params],
                (error, result) => {
                    //global.logger.info("verifyApikey--->", result);
                    if (error) global.logger.error('JUserModelLogin.verifyApikey->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
          * saveChangePassword
          * @param params
          * @param cb
          */
        public saveChangePassword(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JUserModelLogin.saveChangePassword...');
            global.db.callFunc('saveChangePassword',
                [params],
                (error, result) => {
                    // global.logger.info("saveChangePassword--->", result);
                    if (error) global.logger.error('JUserModelLogin.saveChangePassword->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //
    }
}
module.exports = new JMath.JLogin();
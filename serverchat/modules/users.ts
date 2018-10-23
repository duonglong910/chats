var path = require('path');
module JMath {
    export class JUsers {
        /**
       * checkUserLogin
       * @param params
       * @param cb
       */
        public getUser(params, cb?: { (docs: any): void }): void {
            global.logger.trace('checkUserLogin...');
            var sid = params.sessionid == undefined ? "" : params.sessionid; 
            var keylogin = global.cache.getUserKey(sid);
            global.cache.get(keylogin, (err, results) => {
                if (results == 'null' || results == 'undefined') results = null;
                if (!global.util.isNullOrUndefined(results)) {
                    var resultstype = typeof results;
                    if (resultstype.toString() === 'array' || resultstype === 'string')
                        results = JSON.parse(results);
                } else {
                    results = null;
                }
                //global.logger.fatal("results==", results);        
                if (typeof cb === "function")
                    cb(results);
            });
        }
        /**
         * @setUser
         * @param params
         * @param users
         * @param cb
         */
        public setUser(params, users, cb?: { (docs: any[]): void }): void {
            var sid = params.sessionid == undefined ? "" : params.sessionid;
            var keylogin = global.cache.getUserKey(sid);
            if (!global.util.isNullOrUndefined(users) && !global.util.isEmpty(users)) {
                global.cache.set(keylogin, users);
                global.cache.expire(keylogin, global.config.cacheInfo.usertimecache);
            }
        }
        /**
         * @checkPermission
         * @param user
         * @param cb
         */
        public checkPermission(user, cb?: { (): void }): void {
            global.db.callFunc('checkPermission',
                [user],
                (error, result) => {
                    //global.logger.info("checkPermission--->", result);
                    if (error) global.logger.error('JHrmModelJHrm.checkPermission->', error);
                    var err = result['error'] == undefined ? "" : result['error'];
                    if (err == 0 || err == '0') {
                        if (typeof cb === "function") cb();
                    } else {
                        global.socket.on("JAlert:alert", result);
                    }
                });
        }
        /**
         * @checkTask
         * @param user
         * @param task
         */
        public checkTask(user, task): boolean {
            var taskFollows = user.taskfollows;
            var state = _.findWhere(taskFollows, { task: task });
            if (state) return true;
            else return false;
        }
        /**
         * @unsetUser
         * @param params
         * @param result
         * @param socket
         */
        public unsetUser(params, result, socket): void {
            var sid = params.sessionid;
            socket.emit("JVoapp:JLogout", { error: 0, msg: "Thoát thành công", data: result });
            //socket.broadcast.emit("user:JLogout", { error: 0, msg: "Thoát thành công", data: result });
            global.logger.info("JVoapp:Logout...success");
            var keycache = global.cache.getUserKey(sid);
            var keycachesite = global.cache.createUserKey('userloginsite' + sid);
            var keycacheDataItem = global.cache.createUserKey('headerDataItem' + sid);
            global.cache.del(keycache);
            global.cache.del(keycachesite);
            global.cache.del(keycacheDataItem);
        }
        /**
         * @reSetUser
         * @param params
         * @param result
         * @param socket
         */
        public reSetUser(params, result, socket): void {
            var sid = params.sessionid;
            socket.emit("JVoapp:JLogout", { error: 0, msg: "Thoát thành công", data: result });
            //socket.broadcast.emit("user:JLogout", { error: 0, msg: "Thoát thành công", data: result });
            global.logger.info("JVoapp:Logout...success");
            var keycache = global.cache.getUserKey(sid);
            var keycachesite = global.cache.createUserKey('userloginsite' + sid);
            var keycacheDataItem = global.cache.createUserKey('headerDataItem' + sid);
            global.cache.del(keycache);
            global.cache.del(keycachesite);
            global.cache.del(keycacheDataItem);
        }
        /**
         * setNotification
         * @param user
         * @param employee
         * @param obj
         */
        public setNotification(socket,user, employee, obj, cb?: { (): void }): void {
            global.db.callFunc('setNotificationEmployee',
                [user, employee, obj],
                (error, result) => {
                    if (error) global.logger.error('JUser.setNotificationEmployee->', error);
                    if (typeof cb === "function") cb();
                     socket.broadcast.emit("JNotification:userNotification" + employee._id, result);
                   // socket.broadcast.to(employee._id).emit("JNotification:userNotification" + employee._id, result);
                });   
        }
        /**
         * 
         * @param socket
         * @param employeeid
         * @param obj
         * @param cb
         */
        public setAcctionLive(socket, employeeid, obj, cb?: { (): void }): void {
            socket.broadcast.emit("JCpanel:getActions" + employeeid, obj);                     
        }
        /**
         * @setTaskUser
         * @param userid
         * @param username
         * @param avatar
         * @param obj
         * @param cb
         */
        public setTaskUser(user, obj, cb?: { (): void }): void {
            global.db.callFunc('setTaskUser',
                [user, obj],
                (error, result) => {
                    if (error) global.logger.error('JUser.setTaskUser->', error);
                    if (typeof cb === "function") cb();
                });
        }
        /**
         * checkApikey
         * @param params
         */
        public checkSecretApi(params): boolean {
            var SECRETID = global.config.server.clientid;
            var APIKEY = global.config.server.apikey;
            var resapikey = params.apikey;
            var ressecretid = params.secretId;
            if (resapikey == APIKEY && SECRETID == ressecretid) {
                return true;
            } else {
                return false;
            }
        }
        //
    }
}
module.exports = new JMath.JUsers();
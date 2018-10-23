var path = require('path');
module JMath {
    var UserLogin: JLogin = require(path.join(global.pathModules, 'login'));
    export class JUserLogin implements IRoute {
        constructor() {
            require(path.join(global.appRoot, 'enums', 'all-enum'))(JMath);
        }
        public init(socket, passport) {
            global.logger.trace('JUserLogin.init');
            //           
            // Setup the ready route, and emit talk event.
            //JVoapp:serverlogin
            socket.on('JVoapp:serverlogin', (params) => {
                global.logger.info("JVoapp:serverlogin...");
                if (global.util.isNullOrUndefined(params)) {
                    global.logger.info("JVoapp:serverlogin:", 'Không nhận được tham số truyền');
                    socket.emit("JVoapp:serverlogin", { error: JMath.ErrorStatus.isUndefined, msg: null });
                    return;
                }

                if (global.util.isNullOrUndefined(params.user) || global.util.isEmpty(params.user)) {
                    global.logger.info("JVoapp:serverlogin:", 'Bạn chưa nhập email đăng nhập');
                    socket.emit("JVoapp:serverlogin", { error: -5, msg: 'Bạn chưa nhập email đăng nhập' });
                    return;
                }
                if (global.util.isNullOrUndefined(params.user.email)) {
                    global.logger.info("user:serverlogin:", 'Bạn chưa nhập email đăng nhập');
                    socket.emit("JVoapp:serverlogin", { error: -5, msg: 'Bạn chưa nhập email đăng nhập' });
                    return;
                }
                var validator = require("email-validator");
                var isMail = validator.validate(params.user.email); // true 
                if (!isMail) {
                    socket.emit("JVoapp:serverlogin", { error: JMath.ErrorStatus.isNotEmail, msg: 'Email nhập không đúng, Bạn vui lòng nhập lại' });
                    return;
                }
                var sessionid = params.sessionid;
                var keycache = global.cache.getUserServerKey(params.sessionid);
                global.cache.get(keycache, (err, result) => {
                    //global.logger.info("get user from cache=>", result);
                    // check cache                                                     
                    if (result != undefined && result != "" && result != null && result != 'null' && result != '""') {
                        if (typeof result == 'string') {
                            result = JSON.parse(result);
                        }
                        // global.logger.info("JVoapp:Login...result==>2222222222222", result);
                        UserLogin.getUserApps(result, (err, results) => {
                            var errs = 0;
                            var msg = 'Đăng nhập thành công';
                            if (err) {
                                errs = 1;
                                msg = 'Đăng nhập không thành công';
                            }
                            // global.logger.info("get apps info from database of cache user==>", results);
                            if (!global.util.isNullOrUndefined(results) && !global.util.isEmpty(results)) {
                                socket.emit("JVoapp:serverlogin", { error: errs, msg: msg, user: result, apps: [] });
                                var defaultApps = results['defaultComponent'];
                                UserLogin.setMenuItem(defaultApps, sessionid);
                                // set cache apps
                                //UserLogin.setApp(params, results['apps']);
                            } else {
                                socket.emit("JVoapp:serverlogin", { error: 1, msg: 'Đăng nhập không thành công', user: {}, apps: [] });
                            }
                        });
                    } else {
                        // check tu database
                        UserLogin.validateUserServerLogin(params, (err, results) => {
                            var errs = 0;
                            var msg = 'Đăng nhập thành công';
                            if (err) {
                                errs = 1;
                                msg = 'Đăng nhập không thành công';
                            }
                            //   global.logger.info("get user info from database==>", results);
                            if (!global.util.isNullOrUndefined(results) && !global.util.isEmpty(results)) {
                                // kiem tra dang ky ung dung
                                UserLogin.getUserApps(results, (err, rows) => {
                                    var errs = 0;
                                    var msg = 'Đăng nhập thành công';
                                    if (err) {
                                        errs = 1;
                                        msg = 'Đăng nhập không thành công';
                                    }
                                    //  global.logger.info("get apps info from database==>", rows);
                                    if (!global.util.isNullOrUndefined(rows) && !global.util.isEmpty(rows)) {
                                        socket.emit("JVoapp:serverlogin", { error: errs, msg: msg, user: result, apps: [] });

                                        if (rows['listUsers'] != undefined && rows['listUsers'] != '') {
                                            socket.broadcast.emit("JVoapp:Managers", { error: 0, user: rows['listUsers'] });
                                        } else {
                                            socket.broadcast.emit("JVoapp:Managers", { error: 0, user: [] });
                                        }
                                        //
                                        var defaultApps = rows['defaultComponent'];
                                        UserLogin.setMenuItem(defaultApps, sessionid);
                                        // set cache
                                        //var keycaches = global.cache.createUserKey('userApps' + sessionid);
                                        //if (rows['apps'] != undefined && rows['apps'] != null) {
                                        //    global.cache.set(keycaches, rows['apps']);
                                        //    global.cache.expire(keycaches, global.config.cacheInfo.usertimecache);
                                        //}

                                    } else {
                                        socket.emit("JVoapp:serverlogin", { error: 1, msg: 'Đăng nhập không thành công', user: {}, apps: [] });
                                    }
                                    global.cache.set(keycache, results);
                                    global.cache.expire(keycache, global.config.cacheInfo.usertimecache);
                                });
                            } else {
                                socket.emit("JVoapp:serverlogin", { error: 1, msg: 'Đăng nhập không thành công', user: {}, apps: [] });
                            }
                        });
                    }
                });
            });
            /**
            *@function Login
            *@check Login
            */
            socket.on('JVoapp:JLogin', (params) => {
                global.logger.info("JVoapp:Login...");
                if (global.util.isNullOrUndefined(params)) {
                    global.logger.info("JVoapp:JLogin:", 'Không nhận được tham số truyền');
                    socket.emit("JVoapp:JLogin", { error: JMath.ErrorStatus.isUndefined, msg: null });
                    return;
                }

                if (global.util.isNullOrUndefined(params.user) || global.util.isEmpty(params.user)) {
                    global.logger.info("JVoapp:JLogin:", 'Bạn chưa nhập email đăng nhập');
                    socket.emit("JVoapp:JLogin", { error: -5, msg: 'Bạn chưa nhập email đăng nhập' });
                    return;
                }
                if (global.util.isNullOrUndefined(params.user.email)) {
                    global.logger.info("user:JLogin:", 'Bạn chưa nhập email đăng nhập');
                    socket.emit("JVoapp:JLogin", { error: -5, msg: 'Bạn chưa nhập email đăng nhập' });
                    return;
                }

                var validator = require("email-validator");
                var isMail = validator.validate(params.user.email); // true 
                if (!isMail) {
                    socket.emit("JVoapp:JLogin", { error: JMath.ErrorStatus.isNotEmail, msg: 'Email nhập không đúng, Bạn vui lòng nhập lại' });
                    return;
                }
                var sessionid = params.sessionid;
                var keycache = global.cache.getUserKey(sessionid);
                global.cache.get(keycache, (err, result) => {
                    global.logger.info("get user from cache=>", result);
                    // check cache                                                     
                    if (!global.util.isNullOrUndefined(result)) {
                        if (typeof result == 'string') {
                            result = JSON.parse(result);
                        }
                        // global.logger.info("user:Login...result==>2222222222222", result);
                        UserLogin.getUserApps(result, (err, results) => {
                            var errs = 0;
                            var msg = 'Đăng nhập thành công';
                            if (err) {
                                errs = 1;
                                msg = 'Đăng nhập không thành công';
                            }
                            //global.logger.info("get apps info from database of cache user==>", results);
                            if (!global.util.isNullOrUndefined(results)) {
                                var defaultApps = results['defaultComponent'];
                                if (defaultApps != undefined && defaultApps != '') {
                                    socket.emit("JVoapp:JLogin", { error: errs, msg: msg, user: result });
                                    //-set ceach app
                                    UserLogin.setMenuItem(defaultApps, sessionid);
                                    // set cache apps
                                    UserLogin.setApp(params, defaultApps);
                                } else {
                                    socket.emit("JVoapp:JLogin", { error: errs, msg: msg, user: result, apps: [] });
                                }                                       
                                
                            } else {
                                socket.emit("JVoapp:JLogin", { error: 1, msg: 'Đăng nhập không thành công', user: {}, apps: [] });
                            }
                        });
                    } else {
                        // check tu database
                        UserLogin.validateUserLogin(params, (err, results) => {
                            var errs = 0;
                            var msg = 'Đăng nhập thành công';
                            if (err) {
                                errs = 1;
                                msg = 'Đăng nhập không thành công';
                            }
                            //global.logger.info("get user info from database==>", results);
                            if (!global.util.isNullOrUndefined(results)) {
                                // kiem tra dang ky ung dung
                                UserLogin.getUserApps(results, (err, rows) => {
                                    var errs = 0;
                                    var msg = 'Đăng nhập thành công';
                                    if (err) {
                                        errs = 1;
                                        msg = 'Đăng nhập không thành công';
                                    }
                                    global.logger.info("get apps info from database==>");
                                    if (!global.util.isNullOrUndefined(rows)) {
                                        var defaultApps = rows['defaultComponent'];
                                        if (defaultApps != undefined && defaultApps!= '') {
                                            socket.emit("JVoapp:JLogin", { error: errs, msg: msg, user: results });
                                            //-set ceach app
                                            UserLogin.setMenuItem(defaultApps, sessionid);
                                            UserLogin.setApp(params, defaultApps);
                                        } else {
                                            socket.emit("JVoapp:JLogin", { error: errs, msg: msg, user: results });
                                        }                          
                                    } else {
                                        socket.emit("JVoapp:JLogin", { error: 1, msg: 'Đăng nhập không thành công', user: {}, apps: [] });
                                    }
                                    global.cache.set(keycache, results);
                                    global.cache.expire(keycache, global.config.cacheInfo.usertimecache);
                                });
                            } else {
                                socket.emit("JVoapp:JLogin", { error: 1, msg: 'Đăng nhập không thành công', user: {}, apps: [] });
                            }
                        });
                    }
                });
            });
            //    
            socket.on("JVoapp:registerCustomer", (params) => {
                global.logger.info("JVoapp:registerCustomer...");
                if (global.util.isNullOrUndefined(params)) {
                    global.logger.info("JVoapp:registerCustomer:", 'Không nhận được tham số truyền');
                    socket.emit("JVoapp:registerCustomer", { error: JMath.ErrorStatus.isUndefined, msg: 'Bạn chưa nhập thông tin đăng ký' });
                    return;
                }      
                if (global.util.isNullOrUndefined(params.data.firstname) || global.util.isEmpty(params.data.firstname)) {
                    global.logger.info("JVoapp:registerCustomer:", 'Bạn chưa nhập họ và tên đệm');
                    socket.emit("JVoapp:registerCustomer", { error: -5, msg: 'Bạn chưa nhập họ và tên đệm' });
                    return;
                }
                if (global.util.isNullOrUndefined(params.data.lastname) || global.util.isEmpty(params.data.lastname)) {
                    global.logger.info("JVoapp:registerCustomer:", 'Bạn chưa nhập tên');
                    socket.emit("JVoapp:registerCustomer", { error: -5, msg: 'Bạn chưa nhập tên' });
                    return;
                }
                if (global.util.isNullOrUndefined(params.data.email)) {
                    global.logger.info("JVoapp:registerCustomer:", 'Bạn chưa nhập email đăng nhập:', params.data);
                    socket.emit("JVoapp:registerCustomer", { error: -5, msg: 'Bạn chưa nhập email đăng nhập' });
                    return;
                }

                var validator = require("email-validator");
                var isMail = validator.validate(params.data.email); // true 
                if (!isMail) {
                    socket.emit("JVoapp:registerCustomer", { error: JMath.ErrorStatus.isNotEmail, msg: 'Email nhập không đúng, Bạn vui lòng nhập lại' });
                    return;
                }
                UserLogin.registerCustomer(params, (err, results) => {
                    global.logger.error('JLogin.registerCustomer->', results);
                    if (err) {
                        socket.emit("JVoapp:getRegisterCustomer", {error:1,msg:"Lõi database"});
                    } else {
                        socket.emit("JVoapp:getRegisterCustomer", results);
                    }
                });
            });
            /**
            *@function Login
            *@check Login
            */
            socket.on('JVoapp:JLogout', (params) => {
                global.logger.info("JVoapp:Logout...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        UserLogin.JLogout(params, (err, result) => {
                            global.users.reSetUser(params, result, socket);
                        });
                    } else {
                        socket.emit("JVoapp:JLogout", { error: 0, msg: "Thoát thành công" });
                    }
                });
            });
            /**
            *@function Login
            *@check Login
            */
            socket.on('JVoapp:checkUserLogin', (params) => {

                global.logger.info("users:checkUserLogin...");
                var sessid = params.sessionid == undefined ? "" : params.sessionid;
                if (sessid != '') {
                    var keycache = global.cache.createUserKey('guestlogin' + params.sessionid);
                    global.cache.get(keycache, (err, result) => {
                        // check cache
                        var results = {};
                        if (result != undefined && result != 'undefined' && result != '' && result != null && result != 'null') {
                            //   global.logger.info("users:checkUserLogin...type.result===>", typeof result);
                            if (typeof result == 'string') {
                                results = JSON.parse(result);
                            } else {
                                results = result;
                            }
                        }
                        socket.emit("JVoapp:checkUserLogin", {
                            error: 0,
                            data: results['data']
                        });
                    });
                } else {
                    UserLogin.JLogout(params, (err, result) => {
                        global.users.unsetUser(params, result, socket);
                    });
                }
            });
            socket.on("JVoapp:JCheckConnect", (params) => {
                UserLogin.checkApikey(params, (err, result) => {
                    socket.emit("JVoapp:JCheckConnect", result);
                });
            });
            //JVoapp:verifyApikey
            socket.on("JVoapp:verifyApikey", (params) => {
                global.logger.debug("===>", params.data);
                UserLogin.verifyApikey(params, (err, result) => {
                    socket.emit("JVoapp:verifyApikey", result);
                });
            });
            /**
            *@function Login
            *@check Login
            */
            socket.on('JVoapp:checkUserLogin', (params) => {
                global.logger.info("JVoapp:checkUserLogin...");
                var sessid = params.sessionid == undefined ? "" : params.sessionid;
                if (sessid != '') {
                    var keycache = global.cache.createUserKey('guestlogin' + params.sessionid);
                    global.cache.get(keycache, (err, result) => {
                        // check cache
                        var results = {};
                        if (result != undefined && result != 'undefined' && result != '' && result != null && result != 'null') {
                            global.logger.info("JVoapp:checkUserLogin...type.result===>", typeof result);
                            if (typeof result == 'string') {
                                results = JSON.parse(result);
                            } else {
                                results = result;
                            }
                        }
                        socket.emit("JVoapp:checkUserLogin", {
                            error: 0,
                            data: results['data']
                        });
                    });
                } else {
                    UserLogin.JLogout(params, (err, result) => {
                        global.users.unsetUser(params, result, socket);
                    });
                }
            });
            //JVoapp:saveChangePassword
            socket.on('JVoapp:saveChangePassword', (params) => {
                global.logger.info('JVoapp:saveChangePassword.........');
                params.ip = global.util.getIpClient();
                params.ipserver = global.util.getIpAddress();
                params.data.old = global.util.createPasswordRandom(params.user.email, params.data.old);
                params.data.newpwd = global.util.createPasswordRandom(params.user.email, params.data.newpwd);
                params.data.renewpwd = global.util.createPasswordRandom(params.user.email, params.data.renewpwd);
                UserLogin.saveChangePassword(params, (err, result) => {
                    socket.emit("JVoapp:saveChangePassword", result);
                });
            });
            /**  End connect Socket **/
            /**
            */
        }
    }
}
module.exports = new JMath.JUserLogin();
var path = require('path');

module JMath {
    var CpanelModelCpanel: JCpanelModelCpanel = require(path.join(global.pathModel, 'model-cpanel'));
    export class JCpanelController implements IRoute {
        constructor() {
            require(path.join(global.appRoot, 'enums', 'all-enum'))(JMath);
        }
        //
        public init(socket, passport) {
            global.logger.trace('JCpanelController.init');
            // Setup the ready route, and emit talk event.
            //JProduct:getSectionProduct
            socket.on('JVoapp:getBusiness', (params) => {
                if (typeof params === 'string') {
                    params = JSON.parse(params);
                }
                global.logger.info("JVoapp:getBusiness.start..");
                global.users.getUser(params, (user) => {
                    global.logger.info("JVoapp:getBusiness...checkuser:", user);
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getBusiness(params, (errs, result) => {
                            //global.logger.info("JProduct:getBusiness...result:", result);
                            socket.emit("JVoapp:getBusiness", result);
                        });
                    } else {
                        var obj = { error: 0, msg: "Bạn không có quyền này", task: "", total: 0, data: [], obj: {} };    
                        socket.emit("JVoapp:getBusiness", obj);
                    }
                });
            });
            //getTypeMoney
            socket.on('JCpanel:getTypeMoney', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {      
                        params.user = user;
                        CpanelModelCpanel.getTypeMoney(params, (err, result) => {
                            socket.emit("JCpanel:getTypeMoney", result);
                        });
                    } else {
                        var obj = { error: 0, msg: "Bạn không có quyền này", task: "", total: 0, data: [], obj: {} }; 
                        socket.emit("JCpanel:getTypeMoney", obj);                                      
                    }
                });
            });
            //JApp:Install
            socket.on('JApp:Install', (params) => {
                params.ip = global.util.getIpClient();
                params.ipserver = global.util.getIpAddress();
                CpanelModelCpanel.saveAccountCompany(params, (err, result) => {
                    socket.emit("JApp:Install", result);
                });
            });
            //JApp:saveVerifyCompany
            socket.on('JApp:saveVerifyCompany', (params) => {
                params.ip = global.util.getIpClient();
                params.ipserver = global.util.getIpAddress();
                CpanelModelCpanel.saveVerifyCompany(params, (err, result) => {
                    socket.emit("JApp:getSaveVerifyCompany", result);
                    var user = result['data'];
                    if (user != undefined && user != '') {                                        
                        var keycache = global.cache.createUserKey('userlogin' + params.sessionid);
                        global.cache.set(keycache, user);
                        global.cache.expire(keycache, global.config.cacheInfo.usertimecache);
                    }
                });
            });
            //JApp:getItemComponnets
            socket.on('JApp:getItemComponnets', (params) => {
                params.ip = global.util.getIpClient();
                params.ipserver = global.util.getIpAddress();
                CpanelModelCpanel.getItemComponnets(params, (err, result) => {
                    socket.emit("JApp:getItemComponnets", result);
                });
            });
            //updateOrganizationmapCompany
            //JApp:getItemComponnets
            socket.on('JApp:updateOrganizationmapCompany', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.updateOrganizationmapCompany(params, (err, result) => {
                            socket.emit("JApp:getUpdateOrganizationmapCompany", result);
                        });
                    } else {
                        socket.emit("JApp:getUpdateOrganizationmapCompany", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:checkPermission
            socket.on('JApp:checkPermission', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.checkPermission(params, (err, result) => {
                            socket.emit("JApp:getCheckPermission", result);
                        });
                    } else {
                        socket.emit("JApp:getCheckPermission", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JApp:installModulesCompany
            socket.on('JApp:installModulesCompany', (params) => {
                params.ip = global.util.getIpClient();
                params.ipserver = global.util.getIpAddress();
                CpanelModelCpanel.installModulesCompany(params, (err, result) => {
                    socket.emit("JApp:getInstallModulesCompany", result);
                });
            });
            //
            socket.on('JCpanel:getGroups', (params) => {
                //  global.logger.info('JCpanel:getGroups', params);
                CpanelModelCpanel.getGroups(params, (err, result) => {
                    result['error'] = 0;
                    socket.emit("JCpanel:getGroups", result);
                });
            });
            // ----------------------------------------------------------------
            socket.on('JCpanel:getListApp', (params) => {
                CpanelModelCpanel.getListApp(params, (err, result) => {
                    socket.emit("JCpanel:getListApp", { data: result, error: 0 });
                });
            });
            //getItemLisFunction
            socket.on('JCpanel:getItemLisFunction', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getItemLisFunction(params, (err, result) => {
                            socket.emit("JCpanel:getItemLisFunction", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemLisFunction", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // ----------------------------------------------------------------
            socket.on('JCpanel:getCountry', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getCountry(params, (err, result) => {
                            result['error'] = 0;
                            socket.emit("JCpanel:getCountry", result);
                        });
                    } else {
                        socket.emit("JCpanel:getCountry", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getItemComponents
            // ----------------------------------------------------------------
            socket.on('JCpanel:getItemComponents', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getItemComponents(params, (err, result) => {
                            socket.emit("JCpanel:getItemComponents", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemComponents", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //       getMyItemComponents
            socket.on('JCpanel:getMyItemComponents', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getMyItemComponents(params, (err, result) => {
                            socket.emit("JCpanel:getMyItemComponents", result);
                        });
                    } else {
                        socket.emit("JCpanel:getMyItemComponents", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //saveItemTcode
            socket.on('JCpanel:saveItemTcode', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveItemTcode(params, (err, result) => {
                            socket.emit("JCpanel:getItemLisFunction", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemLisFunction", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:getItemListProcess
            socket.on('JCpanel:getItemListProcess', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getItemListProcess(params, (err, result) => {
                            socket.emit("JCpanel:getItemListProcess", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemListProcess", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //saveTaskProcess
            socket.on('JCpanel:saveTaskProcess', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveTaskProcess(params, (err, result) => {
                            socket.emit("JCpanel:getItemListProcess", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemListProcess", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getItemEmployeeProcess
            socket.on('JCpanel:getItemEmployeeProcess', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getItemEmployeeProcess(params, (err, result) => {
                            socket.emit("JCpanel:getItemEmployeeProcess", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemEmployeeProcess", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            /**
           *@save
           */
            socket.on('JCpanel:getItemsCountry', (params) => {
                global.logger.info("JCpanel:getItemsCountry...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getCountry(params, (err, result) => {
                            socket.emit("JCpanel:getItemsCountry", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemsCountry", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            /**
            *@save
            */
            socket.on('JCpanel:saveCountry', (params) => {
                global.logger.info("JCpanel:saveCountry...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveCountry(params, (err, result) => {
                            socket.emit("JCpanel:getCountry", result);
                        });
                    } else {
                        socket.emit("JCpanel:getCountry", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // app.io.on('connection', function (socket) {
            socket.on('JCpanel:getCity', (params) => {
                global.logger.info('JCpanel:getCity.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getCity(params, (err, result) => {
                            result['error'] = 0;
                            socket.emit("JCpanel:getCity", result);
                        });
                    } else {
                        socket.emit("JCpanel:getCity", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getItemCity
            socket.on('JCpanel:getItemCity', (params) => {
                global.logger.info('JCpanel:getItemCity.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getCity(params, (err, result) => {
                            socket.emit("JCpanel:getItemCity", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemCity", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //saveCity
            socket.on('JCpanel:saveCity', (params) => {
                global.logger.info("JCpanel:saveCity...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveCity(params, (err, result) => {
                            socket.emit("JCpanel:getCity", result);
                        });
                    } else {
                        socket.emit("JCpanel:getCity", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getDistrict
            socket.on('JCpanel:getDistrict', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getDistrict(params, (err, result) => {
                            socket.emit("JCpanel:getDistrict", result);
                        });
                    } else {
                        socket.emit("JCpanel:getDistrict", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            /**
            *@save
            */
            socket.on('JCpanel:saveDistrict', (params) => {
                global.logger.info("JCpanel:saveDistrict...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveDistrict(params, (err, result) => {
                            socket.emit("JCpanel:getDistrict", result);
                        });
                    } else {
                        socket.emit("JCpanel:getDistrict", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getCareer
            socket.on('JCpanel:getCareer', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getCareer(params, (err, result) => {
                            socket.emit("JCpanel:getCareer", result);
                        });
                    } else {
                        socket.emit("JCpanel:getCareer", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getCareer
            socket.on('JCpanel:getItemCareer', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getCareer(params, (err, result) => {
                            socket.emit("JCpanel:getItemCareer", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemCareer", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //saveCareer
            socket.on('JCpanel:saveCareer', (params) => {
                global.logger.info("JCpanel:saveCareer...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveCareer(params, (err, result) => {
                            socket.emit("JCpanel:getCareer", result);
                        });
                    } else {
                        socket.emit("JCpanel:getCareer", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getKyapdung
            socket.on('JCpanel:getKyapdung', (params) => {
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getKyapdung(params, (err, result) => {
                            socket.emit("JCpanel:getKyapdung", result);
                        });
                    } else {
                        socket.emit("JCpanel:getKyapdung", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //saveKyapdung
            socket.on('JCpanel:saveKyapdung', (params) => {
                global.logger.info("JCpanel:saveKyapdung...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveKyapdung(params, (err, result) => {
                            socket.emit("JCpanel:getKyapdung", result);
                        });
                    } else {
                        socket.emit("JCpanel:getKyapdung", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // app.io.on('connection', function (socket) {
            socket.on('JCpanel:getListUser', (params) => {
                global.logger.info("JCpanel:getListUser...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getListUser(params, (err, result) => {
                            result['error'] = 0;
                            socket.emit("JCpanel:getListUser", result);
                        });
                    } else {
                        socket.emit("JCpanel:getListUser", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            /**
            *@save
            */
            socket.on('JCpanel:saveUser', (params) => {
                global.logger.info("JCpanel:saveUser...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.saveUser(params, (err, result) => {
                            result.data.total = undefined ? 0 : result.data.total;
                            var obj = { error: 0, msg: '', data: result.data.data, total: result.data.total, _id: result.id, task: params.task };
                            if (params.task == 'remove') {
                                if (err) {
                                    obj.msg = 'Xóa dữ liệu không thành công';
                                } else {
                                    obj.msg = 'Xóa dữ liệu thành công';
                                }
                            } else if (params.task == 'publish') {
                                if (err) {
                                    obj.msg = 'Thiết lập chưa thành công, vui lòng thử lại';
                                } else {
                                    obj.msg = 'Thiết lập thành công';
                                }
                            } else if (params.task == 'order') {
                                if (err) {
                                    obj.msg = 'Thiết lập chưa thành công, vui lòng thử lại';
                                } else {
                                    obj.msg = 'Thiết lập thành công';
                                }
                            } else {
                                if (err) {
                                    obj.msg = 'Lỗi Lưu dữ liệu';
                                } else {
                                    obj.msg = 'Lưu dữ liệu thành công';
                                }
                            }
                            socket.emit("JCpanel:getListUser", obj);
                        });
                    } else {
                        socket.emit("JCpanel:getCompany", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //save teachers:saveQuoctichExtends
            socket.on('JCpanel:getSetting', (params) => {
                global.logger.info("JCpanel:getSetting...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getSetting(params, (err, result) => {
                            socket.emit("JCpanel:getSetting", result);
                        });
                    } else {
                        socket.emit("JCpanel:getCompany", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //cpanel:setAlertCalendar
            socket.on('JCpanel:setAlertCalendar', (params) => {
                global.logger.info("JCpanel:updateItemAppUsers...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getAlertCalendar(params, (errs, result) => {
                            socket.emit("JCpanel:getAlertCalendar", result);
                        });
                    } else {
                        socket.emit("JCpanel:getAlertCalendar", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getItemGroups
            socket.on('JCpanel:getItemGroups', (params) => {
                global.logger.info("JCpanel:getItemGroups...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getItemGroups(params, (errs, result) => {
                            socket.emit("JCpanel:getItemGroups", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemGroups", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getItemGroups
            socket.on('JCpanel:saveItemApps', (params) => {
                global.logger.info("JCpanel:saveItemApps...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.saveItemApps(params, (errs, result) => {
                            socket.emit("JCpanel:getItemComponentApps", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemComponentApps", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getItemGroups
            socket.on('JCpanel:updateItemApps', (params) => {
                global.logger.info("JCpanel:updateItemApps...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.updateItemApps(params, (errs, result) => {
                            socket.emit("JCpanel:getItemApps", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemApps", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:getActions
            socket.on('JCpanel:getActions', (params) => {
                global.logger.info("JCpanel:getActions...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getActions(params, (errs, result) => {
                            socket.emit("JCpanel:getActions" + params.user.rootid, result);
                        });
                    } else {
                        socket.emit("JCpanel:getActions", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:updateLibsFunctions
            socket.on('JCpanel:updateLibsFunctions', (params) => {
                global.logger.info("JCpanel:updateLibsFunctions...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.saveItemLisFunction(params, (errs, result) => {
                            socket.emit("JCpanel:getUpdateLibsFunctions", result);
                        });
                    } else {
                        socket.emit("JCpanel:getUpdateLibsFunctions", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getMyItemNotification
            socket.on('JCpanel:getMyItemNotification', (params) => {
                global.logger.info("JCpanel:getMyItemNotification...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getMyItemNotification(params, (errs, result) => {
                            socket.emit("JCpanel:getMyItemNotification", result);
                        });
                    } else {
                        socket.emit("JCpanel:getMyItemNotification", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //verifyItemWork
            socket.on('JCpanel:verifyItemWork', (params) => {
                global.logger.info("JCpanel:verifyItemWork...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        var state = params.data;
                        CpanelModelCpanel.verifyItemWork(params, (errs, result) => {
                            socket.emit("JCpanel:getMyItemNotification", result);
                            //set log
                            var objData = result['obj'];
                            var titles = objData.content == undefined ? "" : objData.content;
                            var title = params.user["fullname"] + ' Đã xác nhận công việc [' + titles + "]";
                            var obj = { title: title, content: "", image: "", objid: "" };
                            global.users.setTaskUser(params.user, obj);
                            //notitication                               
                            var employeeid = objData.userid == undefined ? "" : objData.userid;
                            if (employeeid != '') {
                                var employeename = objData.username == undefined ? "" : objData.username;
                                var employeenavatar = objData.avatar == undefined ? "" : objData.avatar;
                                var employee = { _id: employeeid.toString(), fullname: employeename, avatar: employeenavatar };
                                global.users.setNotification(socket, params.user, employee, obj);
                            }
                        });
                    } else {
                        socket.emit("JCpanel:getMyItemNotification", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:getMyEmployeesCompany
            socket.on('JCpanel:getMyEmployeesCompany', (params) => {
                global.logger.info("JCpanel:getMyEmployeesCompany...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        var state = params.data;
                        CpanelModelCpanel.getMyEmployeesCompany(params, (errs, result) => {
                            socket.emit("JCpanel:getMyEmployeesCompany", result);
                        });
                    } else {
                        socket.emit("JCpanel:getMyEmployeesCompany", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:saveItemComponent
            socket.on('JCpanel:saveItemComponent', (params) => {
                global.logger.info("JCpanel:saveItemComponent...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.saveItemComponent(params, (errs, result) => {
                            socket.emit("JCpanel:getItemComponentApps", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemComponentApps", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getItemComponentApps
            socket.on('JCpanel:getItemComponentApps', (params) => {
                global.logger.info("JCpanel:getItemComponentApps...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getItemComponentApps(params, (errs, result) => {
                            socket.emit("JCpanel:getItemComponentApps", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemComponentApps", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //saveSetting
            socket.on('JCpanel:saveSetting', (params) => {
                global.logger.info("JCpanel:saveSetting...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.saveSetting(params, (errs, result) => {
                            socket.emit("JCpanel:getMyStateCompany", result);
                        });
                    } else {
                        socket.emit("JCpanel:getMyStateCompany", { error: 0, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JVoapp:getRootApps
            socket.on('JVoapp:getRootApps', (params) => {
                global.logger.info("JErpUser:getRootApps...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getRootApps(params, (err, results) => {
                            socket.emit("JVoapp:getRootApps", results);
                        });
                    } else {
                        socket.emit("JVoapp:getRootApps", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JVoapp:getApps
            socket.on('JVoapp:getApps', (params) => {
                global.logger.info("JErpUser:getApps...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getApps(params, (err, results) => {
                            socket.emit("JVoapp:getApps", results);
                        });
                    } else {
                        socket.emit("JVoapp:getApps", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JVoapp:installApp
            socket.on('JVoapp:installApp', (params) => {
                global.logger.info("JErpUser:installApp...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.installApp(params, (err, results) => {
                            socket.emit("JVoapp:getInstallApp", results);
                            //set user
                            //installApp
                            global.users.setUser(params, results['user']);
                        });
                    } else {
                        socket.emit("JVoapp:getInstallApp", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getItemsJobs
            socket.on('JCpanel:getQuoctich', (params) => {
                global.logger.info('JCpanel:getQuoctich.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                       CpanelModelCpanel.getQuoctich(params, (err, result) => {
                            socket.emit("JCpanel:getQuoctich", result);
                        });
                    } else {
                        socket.emit("JCpanel:getQuoctich", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // saveDepartment
            socket.on('JCpanel:saveQuoctich', (params) => {
                global.logger.info('JCpanel:saveQuoctich.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                       CpanelModelCpanel.saveQuoctich(params, (err, result) => {
                            socket.emit("JCpanel:getQuoctich", result);
                        });
                    } else {
                        socket.emit("JCpanel:getQuoctich", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getItemsJobs
            socket.on('JCpanel:getTongiao', (params) => {
                global.logger.info('JCpanel:getTongiao.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                       CpanelModelCpanel.getTongiao(params, (err, result) => {
                            socket.emit("JCpanel:getTongiao", result);
                        });
                    } else {
                        socket.emit("JCpanel:getTongiao", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // saveDepartment
            socket.on('JCpanel:saveTongiao', (params) => {
                global.logger.info('JCpanel:saveTongiao.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                       CpanelModelCpanel.saveTongiao(params, (err, result) => {
                            socket.emit("JCpanel:getTongiao", result);
                        });
                    } else {
                        socket.emit("JCpanel:getTongiao", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getDantoc
            socket.on('JCpanel:getDantoc', (params) => {
                global.logger.info('JCpanel:getDantoc.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                       CpanelModelCpanel.getDantoc(params, (err, result) => {
                            socket.emit("JCpanel:getDantoc", result);
                        });
                    } else {
                        socket.emit("JCpanel:getDantoc", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // saveDepartment
            socket.on('JCpanel:saveDantoc', (params) => {
                global.logger.info('JCpanel:saveDantoc.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                       CpanelModelCpanel.saveDantoc(params, (err, result) => {
                            socket.emit("JCpanel:getDantoc", result);
                        });
                    } else {
                        socket.emit("JCpanel:getDantoc", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // getDoluong
            socket.on('JCpanel:getDoluong', (params) => {
                global.logger.info('JCpanel:getDoluong.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                       CpanelModelCpanel.getDoluong(params, (err, result) => {
                            socket.emit("JCpanel:getDoluong", result);
                        });
                    } else {
                        socket.emit("JCpanel:getDoluong", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // saveDoluong
            socket.on('JCpanel:saveDoluong', (params) => {
                global.logger.info('JCpanel:saveDantoc.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                       CpanelModelCpanel.saveDoluong(params, (err, result) => {
                            socket.emit("JCpanel:getDoluong", result);
                        });
                    } else {
                        socket.emit("JCpanel:getDoluong", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:getTinhoc
            socket.on('JCpanel:getTinhoc', (params) => {
                global.logger.info('JCpanel:getTinhoc.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getTinhoc(params, (err, result) => {
                            socket.emit("JCpanel:getTinhoc", result);
                        });
                    } else {
                        socket.emit("JCpanel:getTinhoc", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:saveTinhoc
            socket.on('JCpanel:saveTinhoc', (params) => {
                global.logger.info("hrm:saveTinhoc...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveTinhoc(params, (err, result) => {
                            socket.emit("JCpanel:getTinhoc", result);
                        });
                    } else {
                        socket.emit("JCpanel:getTinhoc", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:getHocvan
            socket.on('JCpanel:getHocvan', (params) => {
                global.logger.info('hrm:getHocvan.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getHocvan(params, (err, result) => {
                            socket.emit("JCpanel:getHocvan", result);
                        });
                    } else {
                        socket.emit("JCpanel:getHocvan", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:saveHocvan
            socket.on('JCpanel:saveHocvan', (params) => {
                global.logger.info("JCpanel:saveTinhoc...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveHocvan(params, (err, result) => {
                            socket.emit("JCpanel:getHocvan", result);
                        });
                    } else {
                        socket.emit("JCpanel:getHocvan", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:getLanguages
            socket.on('JCpanel:getLanguages', (params) => {
                global.logger.info('hrm:getLanguages.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.getLanguages(params, (err, result) => {
                            socket.emit("JCpanel:getLanguages", result);
                        });
                    } else {
                        socket.emit("JCpanel:getLanguages", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:saveLanguages
            socket.on('JCpanel:saveLanguages', (params) => {
                global.logger.info("JCpanel:saveLanguages...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        CpanelModelCpanel.saveLanguages(params, (err, result) => {
                            socket.emit("JCpanel:getLanguages", result);
                        });
                    } else {
                        socket.emit("JCpanel:getLanguages", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:getItemUnits
            socket.on('JCpanel:getItemUnits', (params) => {
                global.logger.info("JCpanel:getItemUnits...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getUnits(params, (err, result) => {
                            socket.emit("JCpanel:getItemUnits", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemUnits", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
              //JCpanel:saveUnits
            socket.on('JCpanel:saveUnits', (params) => {
                global.logger.info("JCpanel:saveUnits...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.saveUnits(params, (err, result) => {
                            socket.emit("JCpanel:getItemUnits", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemUnits", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:getItemUnitPrice
            socket.on('JCpanel:getItemUnitPrice', (params) => {
                global.logger.info("JCpanel:getItemUnitPrice...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getItemUnitPrice(params, (err, result) => {
                            socket.emit("JCpanel:getItemUnitPrice", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemUnitPrice", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JCpanel:saveUnitPrice
            socket.on('JCpanel:saveUnitPrice', (params) => {
                global.logger.info("JCpanel:saveUnitPrice...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.saveUnitPrice(params, (err, result) => {
                            socket.emit("JCpanel:getItemUnitPrice", result);
                        });
                    } else {
                        socket.emit("JCpanel:getItemUnitPrice", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getAccounting
            socket.on('JCpanel:getAccounting', (params) => {
                global.logger.info("JCpanel:getAccounting...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getAccounting(params, (err, result) => {
                            socket.emit("JCpanel:getAccounting", result);
                        });
                    } else {
                        socket.emit("JCpanel:getAccounting", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getVirAccounting
            socket.on('JCpanel:getVirAccounting', (params) => {
                global.logger.info("JCpanel:getVirAccounting...");
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        CpanelModelCpanel.getVirAccounting(params, (err, result) => {
                            socket.emit("JCpanel:getVirAccounting", result);
                        });
                    } else {
                        socket.emit("JCpanel:getVirAccounting", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // end connect socket
        }
    }
}
module.exports = new JMath.JCpanelController();
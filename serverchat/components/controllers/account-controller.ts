var path = require('path');

module JMath {
    var model: JAccountModelAccount = require(path.join(global.pathModel, 'model-account'));
    export class JAccountController implements IRoute {
        constructor() {
            require(path.join(global.appRoot, 'enums', 'all-enum'))(JMath);
        }
        //
        public init(socket, passport) {
            global.logger.trace('JAccountController.init');
            // Setup the ready route, and emit talk event.
            //getMyAccounting
            socket.on('JAccount:getMyAccounting', (params) => {
                global.logger.info('JAccount:getMyAccounting.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        model.getMyAccounting(params, (err, result) => {
                            socket.emit("JAccount:getMyAccounting", result);
                        });
                    } else {
                        socket.emit("JAccount:getMyAccounting", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getItemMyAccounting
            socket.on('JAccount:getItemMyAccounting', (params) => {
                global.logger.info('JAccount:getItemMyAccounting.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        model.getMyAccounting(params, (err, result) => {
                            socket.emit("JAccount:getItemMyAccounting", result);
                        });
                    } else {
                        socket.emit("JAccount:getItemMyAccounting", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //saveMyAccounting
            socket.on('JAccount:saveMyAccounting', (params) => {
                global.logger.info('JAccount:saveMyAccounting.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.ip = global.util.getIpClient();
                        params.ipserver = global.util.getIpAddress();
                        params.user = user;
                        model.saveMyAccounting(params, (err, result) => {
                            socket.emit("JAccount:getMyAccounting", result);
                        });
                    } else {
                        socket.emit("JAccount:getMyAccounting", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            // end connect socket
        }
    }
}
module.exports = new JMath.JAccountController();
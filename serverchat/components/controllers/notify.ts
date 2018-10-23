var path = require('path');

module JMath {                                                            
    export class JNotifyController implements IRoute {
        constructor() {
            require(path.join(global.appRoot, 'enums', 'all-enum'))(JMath);
        }
        //
        public init(socket, passport) {
            global.logger.trace('JNotifyController.init');
            // Setup the ready route, and emit talk event.  
            socket.on('notify:getNotify', (params) => {
                global.logger.info('notify:getNotify.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    global.notify.getNotify(params, (err, result) => {
                        socket.emit("notify:getNotify", result);        
                    });
                });
            });
            // Setup the ready route, and emit talk event.  
            socket.on('JNotification:setNotification', (params) => {
                global.logger.info('notify:getNotify.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        global.notify.getNotification(params, (err, result) => {
                            socket.emit("JNotification:getNotification", result);
                        });
                    } else {
                        //5a426e637b6a57fdade67af9
                        socket.emit("JNotification:getNotification", { error: 1, msg: "Not Access" });
                    }
                });
            });
            // Setup the ready route, and emit talk event.  
            socket.on('JNotification:getItemNotification', (params) => {
                global.logger.info('JNotification:getItemNotification.........');
                global.users.getUser(params, (user) => {
                    if (!global.util.isNullOrUndefined(user)) {
                        params.user = user;
                        global.notify.getItemNotification(params, (err, result) => {
                            socket.emit("JNotification:getItemNotification", result);
                        });
                    } else {
                        socket.emit("JNotification:getItemNotification", { error: 1, msg: "Not Access" });
                    }
                });
            });
            // end connect socket
        }
    }
}
module.exports = new JMath.JNotifyController();
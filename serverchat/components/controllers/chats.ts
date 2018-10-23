var path = require('path');

module JMath {
    var chat: JChatModel = require(path.join(global.pathModel, 'chats'));
    export class JChatController implements IRoute {
        constructor() {
            require(path.join(global.appRoot, 'enums', 'all-enum'))(JMath);
        }
        //
        public init(socket, passport) {
            global.logger.trace('JChatController.init');
            // Setup the ready route, and emit talk event.  
            socket.on('JChats:checkTypeChat', (params) => {
                global.logger.info('JChats:checkTypeChat.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    if (!global.users.getUser(user)) {
                        var guest = params.data;
                        var listUsers = guest.listUsers == undefined ? "" : guest.listUsers;
                        //global.logger.info('JChats:checkTypeChat.user=>', listUsers, guest);
                        if (listUsers.length > 0) {
                            listUsers.forEach(function (row) {
                                socket.broadcast.emit('JChats:checkTypeChat' + row.userid, { connected: 1, msg: 'chat...' });
                            });
                        } else {
                            socket.broadcast.emit('JChats:checkTypeChat' + guest._id, { connected: 1, msg: 'chat...' });
                        }
                    } else {
                        socket.emit("JChats:checkTypeChat", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //-------------------------------------------------------------------------------------------------
            socket.on("JChats:addChats", (params) => {
                global.logger.info('JChats:addChats.........');
                global.users.getUser(params, (user) => {
                    if (!global.users.getUser(user)) {
                        var guest = params.guest;
                        params.user = user;
                        // global.logger.info('JChatController.guest=>', guest);
                        chat.addJoinChat(params, (err, result) => {
                            socket.emit("JChats:getListChats", result);
                            chat.sendChat(socket, guest, result);
                        });
                    } else {
                        socket.emit("JChats:getListChats", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getListChats
            socket.on("JChats:getListChats", (params) => {
                global.logger.info('JChats:getListChats.........');
                global.users.getUser(params, (user) => {
                    if (!global.users.getUser(user)) {
                        params.user = user;
                        chat.getListChats(params, (err, result) => {
                            socket.emit("JChats:getListChats", result);
                        });
                    } else {
                        socket.emit("JChats:getListChats", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JChats:getListFileChat
            socket.on("JChats:getListFileChat", (params) => {
                global.logger.info('JChats:getListFileChat.........');
                global.users.getUser(params, (user) => {
                    if (!global.users.getUser(user)) {
                        params.user = user;
                        chat.getListFileChat(params, (err, result) => {
                            if (!global.util.isNullOrUndefined(result))
                                socket.emit("JChats:getListFileChat", result);
                            else
                                socket.emit("JChats:getListFileChat", { error: 1, data: [], msg: "Not data" });

                        });
                    } else {
                        socket.emit("JChats:getListFileChat", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //-----------------------------
            //JChats:uploadFileChat
            socket.on("JChats:uploadFileChat", (params) => {
                global.logger.info('JChats:uploadFileChat.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    // var guest = params.guest;
                    if (!global.users.getUser(user)) {
                        chat.uploadFileChat(params, (err, result) => {

                            // global.logger.info('JChatController.result=>', result);
                            if (!global.util.isNullOrUndefined(result)) {
                                socket.emit("JChats:getListFileChat", result);
                                //chat.sendChat(socket, guest, result);
                            } else
                                socket.emit("JChats:getListFileChat", { error: 1, data: [], msg: "Not data" });

                        });
                    } else {
                        socket.emit("JChats:getListFileChat", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JChats:removeFileChat
            socket.on("JChats:removeFileChat", (params) => {
                global.logger.info('JChats:removeFileChat.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    if (!global.users.getUser(user)) {
                        var guest = params.guest;
                        chat.removeFileChat(params, (err, result) => {
                            socket.emit("JChats:getListFileChat", result);
                             chat.sendChat(socket, guest, result);   
                        });
                    } else {
                        socket.emit("JChats:getListFileChat", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JChats:addRowChat
            socket.on("JChats:addRowChat", (params) => {
                global.logger.info('JChats:addRowChat.........');
                global.users.getUser(params, (user) => {
                    if (!global.users.getUser(user)) {
                        params.user = user;        
                        chat.addRowChat(params, (err, result) => {
                            socket.emit("JChats:getListChats", result);
                            //global.logger.info('JChats:addRowChat==>getListChats.result.........',result);
                            var guest = result['guest'];
                            chat.sendChat(socket, guest, result); 
                        });
                    } else {
                        socket.emit("JChats:getListChats", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JChats:removeRowChat
            socket.on("JChats:removeRowChat", (params) => {
                global.logger.info('JChats:removeRowChat.........');
                global.users.getUser(params, (user) => {
                    if (!global.users.getUser(user)) {
                        var guest = params.guest; params.user = user;
                        chat.removeRowChat(params, (err, result) => {
                            socket.emit("JChats:getListChats", result);
                            chat.sendChat(socket, guest, result);     
                        });
                    } else {
                        socket.emit("JChats:getListChats", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //------------------
            //JChats:getGroupChats
            socket.on("JChats:getListGroupChats", (params) => {
                global.logger.info('JChats:getListGroupChats.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    //global.logger.info('JChats:getGroupChats......user...');
                    if (!global.users.getUser(user)) {
                        chat.getGroupChats(params, (err, result) => {
                            //global.logger.info('JChatController.result=>', result);
                            if (!global.util.isNullOrUndefined(result))
                                socket.emit("JChats:getListGroupChats", result);
                            else
                                socket.emit("JChats:getListGroupChats", { error: 1, data: [], msg: "Not data" });

                        });
                    } else {
                        socket.emit("JChats:getListGroupChats", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JChats:createGroupChat
            socket.on("JChats:createGroupChat", (params) => {
                global.logger.info('JChats:createGroupChat.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    //global.logger.info('JChats:createGroupChat......user...');
                    if (!global.users.getUser(user)) {
                        chat.createGroupChat(params, (err, result) => {
                            //global.logger.info('JChatController.result=>', result);
                            if (!global.util.isNullOrUndefined(result))
                                socket.emit("JChats:getListGroupChats", result);
                            else
                                socket.emit("JChats:getListGroupChats", { error: 1, data: [], msg: "Not data" });

                        });
                    } else {
                        socket.emit("JChats:getListGroupChats", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JChats:userJoinToGroup
            socket.on("JChats:userJoinToGroup", (params) => {
                global.logger.info('JChats:userJoinToGroup.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    //global.logger.info('JChats:userJoinToGroup......user...');
                    if (!global.users.getUser(user)) {
                        chat.userJoinToGroup(params, (err, result) => {
                            //global.logger.info('JChatController.result=>', result);
                            if (!global.util.isNullOrUndefined(result))
                                socket.emit("JChats:userJoinToGroup", result);
                            else
                                socket.emit("JChats:userJoinToGroup", { error: 1, data: [], msg: "Not data" });

                        });
                    } else {
                        socket.emit("JChats:userJoinToGroup", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //JChats:addTaskToListCalendar
            socket.on("JChats:addTaskToListCalendar", (params) => {
                global.logger.info('JChats:addTaskToListCalendar.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    //global.logger.info('JChats:userJoinToGroup......user...');
                    if (!global.users.getUser(user)) {
                        chat.addTaskToListCalendar(params, (err, result) => {
                            global.logger.info('JChatController.result=>', result);
                            if (!global.util.isNullOrUndefined(result))
                                socket.emit("JChats:addTaskToListCalendar", result);
                            else
                                socket.emit("JChats:addTaskToListCalendar", { error: 1, data: {}, msg: "Not data" });

                        });
                    } else {
                        socket.emit("JChats:addTaskToListCalendar", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //--comments---
            socket.on('JChats:checkTypeCommmentWork', (params) => {
                global.logger.info('JChats:checkTypeCommmentWork.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    if (!global.users.getUser(user)) {
                        var guest = params.data;
                        var listUsers = guest.userFollows == undefined ? "" : guest.userFollows;
                        //global.logger.info('JChats:checkTypeChat.user=>', listUsers, guest);
                        if (listUsers != '' && listUsers.length > 0) {
                            listUsers.forEach(function (row) {
                                socket.broadcast.emit('JChats:checkTypeCommmentWork' + row.userid, { connected: 1, msg: 'chat...' });
                            });
                        }
                    } else {
                        socket.emit("JChats:checkTypeCommmentWork", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //-------------------------------------------------------------------------------------------------
            socket.on("JChats:addCommentWork", (params) => {
                global.logger.info('JChats:addCommentWork.........');
                global.users.getUser(params, (user) => {
                    params.user = user;
                    //global.logger.info('JChats:addChats......user...');
                    if (!global.users.getUser(user)) {
                        // global.logger.info('JChatController.guest=>', guest);
                        chat.addCommentWork(params, (err, result) => {
                            socket.emit("JChats:getListCommentWork", result);
                            chat.sendComment(socket, params, result);
                        });
                    } else {
                        socket.emit("JChats:getListCommentWork", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //getListChats
            socket.on("JChats:getListCommentWork", (params) => {
                global.logger.info('JChats:getListCommentWork.........');
                global.users.getUser(params, (user) => {
                    if (!global.users.getUser(user)) {
                        params.user = user;
                        chat.getListCommentWork(params, (err, result) => {
                            socket.emit("JChats:getListCommentWork", result);
                        });
                    } else {
                        socket.emit("JChats:getListCommentWork", { error: 1, msg: "Bạn không có quyền này" });
                    }
                });
            });
            //-------------------------------------------------------------------------------------------------
        }
    }
}
module.exports = new JMath.JChatController();
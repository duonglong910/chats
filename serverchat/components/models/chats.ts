var path = require('path');
module JMath {
    class JConnection {
        protected id;
        protected socket;
        protected userid;
        constructor(id, userid, socket) {
            this.id = id;
            this.socket = socket;
            this.userid = userid;
        }
    }
    export class JChatModel {
        protected connections = [];
        /**
         * @setAlertChat
         * @param userid
         * @param clientid
         * @param data
         */
        public setAlertChat(userid, clientid, data): void {
            let socket = global.socket;
            this.connections.push(new JConnection(clientid, userid, socket));
            for (let i = 0, len = this.connections.length; i < len; i++) {
                if (this.connections[i].id == clientid) {
                    this.connections[i].socket.emit('JNotification:notifition', { userid: userid, status: true, data: data });
                    break;
                }
            }
        }
        /**
         *@sendChat
         * @param socket
         * @param guest
         * @param result
         */
        public sendChat(socket, guest, result) {
            var listUsers = guest.listUsers == undefined ? "" : guest.listUsers;
            if (listUsers.length > 0) {
                listUsers.forEach(function(row) {
                    socket.broadcast.emit('JChats:getListChats' + row._id, result);
                });
            } else {
                socket.broadcast.emit('JChats:getListChats' + guest._id, result);
            }
        }
        /**@addJoinChat
         * 
         * @param params
         * @param cb
         */
        public addJoinChat(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.addJoinChat...');
            global.db.callFunc('addJoinChat',
                [params],
                (error, result) => {
                    // global.logger.info("addChatStore--->", result);
                    if (error) global.logger.error('JChatModel.addJoinChat->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //
        /**@
        * @getListChats
        * @param params
        * @param cb
        */
        public getListChats(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.getListChats...');
            global.db.callFunc('getListChats',
                [params],
                (error, result) => {
                    //global.logger.info("getListChats--->", result);
                    if (error) global.logger.error('JChatModel.getListChats->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
         * @getListFileChat
         * @param params
         * @param cb
         */
        public getListFileChat(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.getListFileChat...');
            global.db.callFunc('getListFileChat',
                [params],
                (error, result) => {
                    // global.logger.info("getListFileChat--->", result);
                    if (error) global.logger.error('JChatModel.getListFileChat->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
        * @getListFileChat
        * @param params
        * @param cb
        */
        public uploadFileChat(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.uploadFileChat...');
            global.db.callFunc('uploadFileChat',
                [params],
                (error, result) => {
                    // global.logger.info("getListFileChat--->", result);
                    if (error) global.logger.error('JChatModel.uploadFileChat->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
          * @getListFileChat
          * @param params
          * @param cb
          */
        public removeFileChat(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.removeFileChat...');
            global.db.callFunc('removeFileChat',
                [params],
                (error, result) => {
                    // global.logger.info("getListFileChat--->", result);
                    if (error) global.logger.error('JChatModel.removeFileChat->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
         * @addRowChat
         * @param params
         * @param cb
         */
        public addRowChat(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.addRowChat...');
            global.db.callFunc('addRowChat',
                [params],
                (error, result) => {
                    // global.logger.info("addRowChat--->", result);
                    if (error) global.logger.error('JChatModel.addRowChat->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
         * @removeRowChat
         * @param params
         * @param cb
         */
        public removeRowChat(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.removeRowChat...');
            global.db.callFunc('removeRowChat',
                [params],
                (error, result) => {
                    // global.logger.info("removeRowChat--->", result);
                    if (error) global.logger.error('JChatModel.removeRowChat->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
         * @getGroupChats
         * @param params
         * @param cb
         */
        public getGroupChats(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.getGroupChats...');
            global.db.callFunc('getGroupChats',
                [params],
                (error, result) => {
                    // global.logger.info("createGroupChat--->", result);
                    if (error) global.logger.error('JChatModel.getGroupChats->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
         * @createGroupChat
         * @param params
         * @param cb
         */
        public createGroupChat(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.createGroupChat...');
            global.db.callFunc('createGroupChat',
                [params],
                (error, result) => {
                    // global.logger.info("createGroupChat--->", result);
                    if (error) global.logger.error('JChatModel.createGroupChat->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
        * @userJoinToGroup
        * @param params
        * @param cb
        */
        public userJoinToGroup(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.userJoinToGroup...');
            global.db.callFunc('userJoinToGroup',
                [params],
                (error, result) => {
                    // global.logger.info("userJoinToGroup--->", result);
                    if (error) global.logger.error('JChatModel.userJoinToGroup->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
         * @addTaskToListCalendar
         * @param params
         * @param cb
         */
        public addTaskToListCalendar(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.addTaskToListCalendar...');
            global.db.callFunc('addTaskToListCalendar',
                [params],
                (error, result) => {
                    global.logger.info("addTaskToListCalendar--->", result);
                    if (error) global.logger.error('JChatModel.addTaskToListCalendar->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //-----------------
        /**@
          * @addCommentWork
          * @param params
          * @param cb
          */
        public addCommentWork(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.addCommentWork...');
            global.db.callFunc('addCommentWork',
                [params],
                (error, result) => {
                    global.logger.info("addCommentWork--->");
                    if (error) global.logger.error('JChatModel.addCommentWork->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**@
         * @getListCommentWork
         * @param params
         * @param cb
         */
        public getListCommentWork(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JChatModel.getListCommentWork...');
            global.db.callFunc('getListCommentWork',
                [params],
                (error, result) => {
                    global.logger.info("getListCommentWork--->");
                    if (error) global.logger.error('JChatModel.getListCommentWork->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
       *@sendComment
       * @param socket
       * @param guest
       * @param result
       */
        public sendComment(socket, params, result) {
            var state = params.data;
            var userid = params.user._id;
            var userAgentId = state.userAgentId;
            var listUsers = state.listUsers == undefined ? "" : state.listUsers;
            if (listUsers == '') {
                listUsers = [{ userid: "587cf4bd1459a8003a7fc3ac", fullname: "", avatar: "" }];
            } else {
                listUsers.push({ userid: "587cf4bd1459a8003a7fc3ac", fullname: "", avatar: "" });
            }
            if (userAgentId != userid) {
                listUsers.push({ userid: state.userAgentId, fullname: state.userAgentName, avatar: state.userAgentAvatar });
            }
            if (listUsers != '' && listUsers.length > 0) {
                listUsers.forEach(function(row) {
                    socket.broadcast.emit('JChats:getListCommentWork' + row.userid, result);
                });
            }
        }
        //
    }
}
module.exports = new JMath.JChatModel();
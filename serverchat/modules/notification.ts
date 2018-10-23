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
    export class JNotification {
        protected connections = [];
        //
        public setNotification(userid, clientid, data): void {
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
         * @setNotify
         * @param agentId
         * @param userid
         * @param subject
         * @param content
         * @param images
         */
        public setNotify(agentId, userid, subject, content, images): void {
            this.saveNotify(agentId, userid, subject, content, images, (error, doc) => {
                global.socket.broadcast.emit("JNotification:userNotification" + userid, doc);
            });
        }
        /**
         * @setMultipleNotify
         * @param agentId
         * @param listUserId
         * @param subject
         * @param content
         * @param images
         */
        public setMultipleNotify(agentId, listUserId, subject, content, images): void {
            var obj = {
                subject: subject,
                content: content,
                images: images
            };
            this.insertMultiNotify(agentId, listUserId, obj, (err, doc) => {
                doc.forEach((row) => {
                    global.socket.broadcast.emit("JNotification:userNotification" + row.userid, row);
                });
            });
        };
        /**
        * getListAppItems
        * @param params
        * @param id ngưởi tạo ra sự kiện
        * @ id người nhận
        * @ object=
        */
        public saveNotify(userAgentId, userid, subject, content, images, cb?: { (err, docs: any[]): void }): void {
            var obj = {
                subject: subject,
                images: images,
                content: content
            };
            global.db.callFunc('insertNotify',
                [userAgentId, userid, obj],
                (error, result) => {
                    // global.logger.info("insertNotify--->", result);
                    if (error) global.logger.error('JNotify.insertNotify->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
         * getListAppItems
         * @param params
         * @param id ngưởi tạo ra sự kiện
         * @ id người nhận
         * @ object=
         */
        public insertNotify(userAgentId, userid, obj, cb?: { (err, docs: any[]): void }): void {
            global.db.callFunc('insertNotify',
                [userAgentId, userid, obj],
                (error, result) => {
                    //global.logger.info("insertNotify--->", result);
                    if (error) global.logger.error('JNotify.insertNotify->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        //insertMultiNotify
        /**
         * getListAppItems
         * @param params
         * @param id ngưởi tạo ra sự kiện
         * @ id người nhận
         * @ object=
         */
        public insertMultiNotify(userAgentId, ArrUserId, obj, cb?: { (err, docs: any[]): void }): void {
            global.db.callFunc('insertMultiNotify',
                [userAgentId, ArrUserId, obj],
                (error, result) => {
                    global.logger.info("insertMultiNotify--->", result);
                    if (error) global.logger.error('JNotify.insertMultiNotify->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
        * getNotify
        * @param params
        * @param id ngưởi tạo ra sự kiện
        * @ id người nhận
        * @ object=
        */
        public getNotify(params, cb?: { (err, docs: any[]): void }): void {
            global.db.callFunc('getNotify',
                [params],
                (error, result) => {
                    //  global.logger.info("getNotify--->", result);
                    if (error) global.logger.error('JNotify.getNotify->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
        * getNotification
        * @param params
        * @param id ngưởi tạo ra sự kiện
        * @ id người nhận
        * @ object=
        */
        public getNotification(params, cb?: { (err, docs: any[]): void }): void {
            global.db.callFunc('getNotification',
                [params],
                (error, result) => {
                    //  global.logger.info("getNotification--->", result);
                    if (error) global.logger.error('JNotify.getNotification->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }
        /**
        * getItemNotification
        * @param params
        * @param id ngưởi tạo ra sự kiện
        * @ id người nhận
        * @ object=
        */
        public getItemNotification(params, cb?: { (err, docs: any[]): void }): void {
            global.db.callFunc('getItemNotification',
                [params],
                (error, result) => {
                    //  global.logger.info("getItemNotification--->", result);
                    if (error) global.logger.error('JNotify.getItemNotification->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }

    }
}
module.exports = new JMath.JNotification();
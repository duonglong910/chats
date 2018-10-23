module JMath {
    export interface JNotify {
        setNotification(userid, clientid, data): void;
        saveNotify(userAgentId, userid, subject, content, images, cb?: { (err, docs: any[]): void }): void;
        insertNotify(userAgentId, userid, obj, cb?: { (err, docs: any[]): void }): void;
        insertMultiNotify(userAgentId, ArrUserId, obj, cb?: { (err, docs: any[]): void }): void;
        getNotify(params, cb?: { (err, docs: any[]): void }): void;
        getNotification(params, cb?: { (err, docs: any[]): void }): void;
        getItemNotification(params, cb?: { (err, docs: any[]): void }): void;
    }
}
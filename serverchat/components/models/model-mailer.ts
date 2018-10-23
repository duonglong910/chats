var path = require('path');
module JMath {
    export class JMailerModel {
        /**
        * addMailSend
        * @param params
        * @param cb
        */
        public addMailSend(params, cb?: { (err, docs: any[]): void }): void {
            global.logger.trace('JMailerModel.addMailSend...');
            global.db.callFunc('addMailSend',
                [params],
                (error, result) => {
                    //global.logger.info("getItemCustomers--->", result);
                    if (error) global.logger.error('JMailerModel.addMailSend->', error);
                    if (typeof cb === "function")
                        cb(error, result);
                });
        }

    }
}
module.exports = new JMath.JMailerModel();
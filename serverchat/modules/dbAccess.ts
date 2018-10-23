module JMath {
    var path = require('path');
    var mongo = require('mongoskin');

    export class DbAccess {
        public static db;

        public connect(): any {
            if (global.util.isNullOrUndefined(DbAccess.db)) {
                var dbInfo = global.config.dbInfo;
                global.logger.trace('DbAccess.connected');
                var connString = global.util.stringFormat('mongodb://{0}:{1}/{2}',
                    dbInfo.server, dbInfo.port, dbInfo.db);
                DbAccess.db = mongo.db(connString, {
                    server: {
                        auto_reconnect: true,
                        poolSize: 30,
                        socketOptions: {
                            connectTimeoutMS: 30000,
                            socketTimeoutMS: 30000
                        }
                    }
                });
            }
            return DbAccess.db;
        }

        public getDbCollection(name: string): DbCollection {
            var dbConnection = new (require(path.join(global.appRoot, 'modules', 'dbConnection')))(name);
            return dbConnection;
        }

        public callFunc(funcName: string, params: any[], cb: { (err, res): void }): void {
            global.logger.trace('DbAccess.callFunc', funcName);
            var cmd = funcName + '(';
            if (typeof params !== 'undefined' && params.length > 0) {
                for (var i in params) {
                    cmd += 'arguments[' + i + '], ';
                }
                cmd = cmd.replace(/, $/, '');
            }
            cmd += ');';   
            var db = this.connect();
            db.eval(cmd, params, { nolock: true }, (err, res) => {
                if (err) global.logger.error('DbAccess.callFunc', err, params);
                if (global.util.isFunction(cb)) cb(err, res);
            });
        }
    }
}

module.exports = new JMath.DbAccess();
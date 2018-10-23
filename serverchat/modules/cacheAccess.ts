module JMath {
    var async: Async = require('async');
    var config = require('config');
    export class CacheAccess implements ICacheAccess {
        /**
         * del
         * @param key
         * @param cb
         */
        public del(key: string, cb?: { (err): void }): void {
            global.appServer.redisClient.del(key, cb);
        }
        /**
         * set
         * @param key
         * @param val
         * @param cb
         */
        public set(key: string, val: Object, cb?: { (err, result): void }): void {
            // global.logger.trace('====================', key, val, JSON.stringify(val));
            global.appServer.redisClient.set(key, JSON.stringify(val), cb);
            //global.webServer.redisClient.set(key, val, cb);
        }
        /**
         * setMutil
         * @param keys
         * @param vals
         * @param time
         * @param cb
         */
        public setMutil(keys: string[], vals: Object[], time: Number, cb?: { (err, results): void }): void {
            global.logger.trace('CacheAccess.setMutil:', keys);
            var multi = global.appServer.redisClient.multi();
            for (var i = 0; i < keys.length; i++) {
                multi.set(keys[i], vals[i]);
                multi.expire(keys[i], time);
            }
            multi.exec(cb);
        }
        /**
         * expire
         * @param key
         * @param time
         */
        public expire(key: string, time: Number): void {
            global.appServer.redisClient.expire(key, time);
        }
        /**
         * get
         * @param key
         * @param cb
         */
        public get(key: string, cb?: { (err, result): void }): void {
            global.logger.fatal('CacheAccess.get:', key);
            global.appServer.redisClient.get(key, (err, reply) => {
                //global.logger.trace('CacheAccess.get:', key, JSON.stringify(reply));
                if (!err) {
                    if (reply != null && reply.indexOf('{') == 0 && (reply.lastIndexOf('}') == reply.length - 1)) {
                        cb(err, JSON.parse(reply));
                    } else if (cb) {
                        cb(err, reply);
                    }
                }
            });
        }
        /**
         * getMutil
         * @param keys
         * @param cb
         */
        public getMutil(keys: string[], cb?: { (err, results): void }): void {
            global.logger.trace('CacheAccess.getMutil:', keys);
            var multi = global.appServer.redisClient.multi();
            for (var i = 0; i < keys.length; i++) {
                multi.get(keys[i]);
            }
            multi.exec(cb);
        }
        /**
         * hmsetMutil
         * @param hNames
         * @param objs
         * @param time
         * @param cb
         */
        public hmsetMutil(hNames: string[], objs: Object[], time: Number, cb?: { (err, results): void }): void {
            global.logger.trace('CacheAccess.hsetMutil:', hNames);
            var multi = global.appServer.redisClient.multi();
            for (var i = 0; i < hNames.length; i++) {
                multi.hmset(hNames[i], objs[i]);
            }
            multi.exec(cb);
        }
        /**
         * hmgetMutil
         * @param hNames
         * @param kNames
         * @param cb
         */
        public hmgetMutil(hNames: string[], kNames: string[], cb?: { (err, results): void }): void {
            global.logger.trace('CacheAccess.hgetMutil:', hNames, kNames);
            var self = this;
            var series = [];
            for (var hNameIndex in hNames) {
                createSeries(hNames[hNameIndex]);
            }
            async.series(series, cb);
            function createSeries(hName) {
                series.push(callback => {
                    self.hmget(hName, kNames, (err, results) => {
                        callback(null, results);
                    });
                });
            }
        }
        /**
         * hgetallMutil
         * @param hNames
         * @param cb
         */
        public hgetallMutil(hNames: string, cb?: { (err, results): void }): void {
            global.logger.trace('CacheAccess.hgetallMutil:', hNames);
            var multi = global.appServer.redisClient.multi();
            for (var i = 0; i < hNames.length; i++) {
                multi.hgetall(hNames[i]);
            }
            multi.exec(cb);
        }
        /**
         * hset
         * @param hName
         * @param kName
         * @param val
         * @param cb
         */
        public hset(hName: string, kName: string, val: Object, cb?: { (err, result): void }): void {
            global.logger.trace('CacheAccess.hset:', hName, kName, val);
            global.appServer.redisClient.hset(hName, kName, val, cb);
        }
        /**
         * hget
         * @param hName
         * @param kName
         * @param cb
         */
        public hget(hName: string, kName: string, cb?: { (err, result): void }): void {
            global.appServer.redisClient.hget(hName, kName, cb);
        }
        /**
         * hmset
         * @param hName
         * @param obj
         */
        public hmset(hName: string, obj: Object): void {
            global.logger.trace('CacheAccess.hmset:', hName, obj);
            global.appServer.redisClient.hmset(hName, obj);
        }
        /**
         * hmget
         * @param hName
         * @param kNames
         * @param cb
         */
        public hmget(hName: string, kNames: string[], cb?: { (err, result): void }): void {
            global.logger.trace('CacheAccess.hmget:', hName, kNames);
            global.appServer.redisClient.hmget(hName, kNames, cb);
        }
        /**
         * hgetall
         * @param hName
         * @param cb
         */
        public hgetall(hName: string, cb?: { (err, result): void }): void {
            global.appServer.redisClient.hgetall(hName, cb);
        }
        /**
         * hmSetIincr
         * @param hName
         * @param hkey
         * @param hval
         */
        public hmSetIincr(hName: string, hkey: string, hval: any): void {
            global.logger.trace('CacheAccess.hm_set_incr', hName, hkey, hval);
            global.appServer.redisClient.hmset(hName, hkey, hval).incr(hkey);
        }

        public scan(cursor: number, key: string, cb?: { (err, result): void }): void {
            // global.logger.trace('CacheAccess.hm_set_incr', hName, hkey, hval);         
            global.appServer.redisClient.scan(cursor, 'MATCH', '*' + key + '*', 'COUNT', '10', cb);
        }

        public flushAll(cb?: { (err, result): void }): void {
            // global.logger.trace('CacheAccess.hm_set_incr', hName, hkey, hval);
            global.appServer.redisClient.flushall(cb);
        }
        /*Cache keys*/
        public createUserKey(id: string): string {
            return config.get('cacheInfo.cachePrefix') + '.user:' + id;
        }
        public getUserKey(id: string): string {
            return config.get('cacheInfo.cachePrefix') + '.user:userlogin' + id;
        }
        public getUserServerKey(id: string): string {
            return config.get('cacheInfo.cachePrefix') + '.user:userlogin' + id;
        }
        /**
         * 
         * @param sessionid
         * @param cb
         */
        public getUserInfo(sessionid, cb?: { (err, result): void }): void {
            var keycache = this.getUserKey(sessionid);
            global.logger.fatal('CacheAccess.get:', keycache);
            global.appServer.redisClient.get(keycache, (err, reply) => {
                if (!err) {
                    if (reply != null && reply.indexOf('{') == 0 && (reply.lastIndexOf('}') == reply.length - 1)) {
                        cb(err, JSON.parse(reply));
                    } else if (cb) {
                        cb(err, reply);
                    }
                }
            });
        }
        //
    }
}

module.exports = new JMath.CacheAccess(); 
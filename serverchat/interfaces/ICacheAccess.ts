module JMath {
    export interface ICacheAccess {
        del(key: string, cb?: { (err): void }): void;
        set(key: string, val: Object, cb?: { (err, result): void }): void;
        setMutil(keys: string[], vals: Object[], time: Number, cb?: { (err, results): void }): void;
        expire(key: string, time: Number): void;
        get(key: string, cb?: { (err, result): void }): void;
        hset(hName: string, kName: string, val: Object, cb?: { (err, result): void }): void;
        hget(hName: string, kName: string, cb?: { (err, result): void }): void;
        hgetall(hName: string, cb?: { (err, result): void }): void;
        getMutil(keys: string[], cb?: { (err, results): void }): void;     
        hmset(hName: string, obj: Object): void;
        hmget(hName: string, kNames: string[], cb?: { (err, result): void }): void;
        hmsetMutil(hNames: string[], objs: Object[], time: Number, cb?: { (err, results): void }): void;
        hmgetMutil(hNames: string[], kNames: string[], cb?: { (err, results): void }): void;
        hgetallMutil(hNames: string, cb?: { (err, results): void }): void;
        hmSetIincr(hName: string, hkey: string, hval: any): void;
        scan(cursor: number, key: string, cb?: { (err, result): void }): void;
        /*cache keys*/
        createUserKey(id: string): string;
        getUserServerKey(id: string): string;
        getUserKey(id: string): string
        getUserInfo(sessionid: string, cb?: { (err, result): void }): void;
    }
}
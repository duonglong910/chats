module JMath {
    export interface IAppServer {
        //vuna added
        init();
        redisClient: any;
        start(): void;
        stop(): void;
    }
}
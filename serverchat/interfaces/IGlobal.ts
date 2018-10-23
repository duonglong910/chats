module JMath {
    export interface IGlobal {
        clientFolder: string;
        appRoot: string;
        pathComponents: string;
        pathController: string;
        pathModel: string;
        pathModules: string;
        app: any;
        express: any;
        logger: ILogger;
        appServer: IAppServer;
        io: any;
        socket: any;
        dbAccess: JMath.DbAccess;
        redisClient: any;
        config: JMath.IConfig;
        util: JMath.IUtil;
        hbs: any;
        location: string;
        prefix: string;
        host: string;
        port: number;
        ssl: string;
        socketPort: number;
        db: JMath.DbAccess;
        cache: ICacheAccess;
        mail: JMailer;
        notify: any;
        users: IUsers;
        modelmailer: any;
        pathModelPC: string;
        pathModelMobile: string;
    }
    
}
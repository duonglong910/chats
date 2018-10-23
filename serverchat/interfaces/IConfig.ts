module JMath {
    export interface IServer {
        host: string;
        servername: string;
        logLevel: string;
        clientid: string;
        apikey: string;
        port: number;
        requestTimeout: string;
        prefixhost: string;
        ssl: string;
        socketPort: number;
    }

    export interface IDbInfo {
        server: string;
        port: number;
        db: string;
        strict: boolean;
    }

    export interface ICacheInfo {
        server: string;
        port: number;
        usertimecache: number;
        apptimecache: number;
        timefeeds: number;
    }
    export interface IMail {
        host: string;
        ssl: boolean;
        port: number;
        from: string;
        pass: string;
        authrize: boolean;
    }

    export interface ISessionInfo {
        timeout: string;
        secret: string;
    }

    export interface IConfig {
        session?: ISessionInfo;
        dbInfo: IDbInfo;
        cacheInfo?: ICacheInfo;
        server?: IServer;
        mail: IMail;
    }
}
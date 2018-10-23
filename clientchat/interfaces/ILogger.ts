module JMath {
    export interface ILogger {
        logLv: JMath.LogLevel;
        trace(...args: any[]): void;
        debug(...args: any[]): void;
        info(...args: any[]): void;
        warn(...args: any[]): void;
        error(...args: any[]): void;
        fatal(...args: any[]): void;
    }
}
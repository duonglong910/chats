module JMath {
    export interface ILogger {
        setLevel(lv: string): void;
        level(lv: string): void;
        trace(...args: any[]): void;
        debug(...args: any[]): void;
        info(...args: any[]): void;
        warn(...args: any[]): void;
        error(...args: any[]): void;
        fatal(...args: any[]): void;
    }
}
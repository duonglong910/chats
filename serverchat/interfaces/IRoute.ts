module JMath {
    export interface IRoute {
        init(app, passport): void;
    }

    export interface ISocketRoute {
        init(socket): void;
    }
}
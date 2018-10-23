module JMath {
    export interface IUsers {
        getUser(params, cb?: { (docs: any[]): void }): void;
        setUser(params, users, cb?: { (docs: any[]): void }): void;        
        unsetUser(params, result, socket): void;
        reSetUser(params, result, socket): void;
        checkTask(user, task): boolean;
        setNotification(socket,user, employee, obj, cb?: { (): void }): void;
        setTaskUser(user, obj, cb?: { (): void }): void;
        checkSecretApi(params): boolean;
        setAcctionLive(socket, employeeid, obj, cb?: { (): void }): void;
    }
}
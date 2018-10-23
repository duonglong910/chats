module JMath {
    export interface IRole {
        id?: Object;
        name?: string;
        description?: string;
        subRoles?: IRole[]
    }
}
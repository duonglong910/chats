module JMath {
    export interface IGroup {
        _id?: Object;
        name: string;
        description?: string;
        roles?: IRole[]
    }
}
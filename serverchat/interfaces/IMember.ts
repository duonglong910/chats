module JMath {
    export interface IMember {
        _id?: string;
        local?: {
            email?: string;
            password?: string;
            secretKey?: string; //default 24 ky tu
        };
        facebook?: {
            _id?: string;
            token?: string;
            email?: string;
            name?: string;
        };
        twitter?: {
            _id?: string;
            token?: string;
            displayName?: string;
            username?: string;
        };
        google?: {
            _id?: string;
            token?: string;
            email?: string;
            name?: string;
        };
        memberGroup?: IGroup[];
        roles?: IRole[];
        avatarId?: string;
        status?: number //default 1
        time?: number;
        point?: number; //default 0
    }
}
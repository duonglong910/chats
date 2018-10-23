module JMath {
    export interface IUtil {
        setObjectId(obj: any): any;
        parseJson(json: string): any;
        readJson(filePath: string);
        readFile(filePath: string, cb?: { (data: string): void });
        capitalizeFirstLetterOfWord(val: string): string;
        stringFormat(source: string, ...args: any[]): string;
        random(low: number, high: number): number;
        cookieParser(data: string): Object;
        getSessionId(cookiesData: string): string;
        isLoggedIn(req, res, next): void;
        isArray(thing: any): boolean;
        isString(thing: any): boolean;
        isObject(thing: any): boolean;
        isNumber(thing: any): boolean;
        isBoolean(thing: any): boolean;
        isFunction(thing: any): boolean;
        isNullOrUndefined(obj): boolean;
        isEmpty(obj): boolean;
        isValidObjectId(obj): boolean;
        removeNullProperties(val: any): any;
        generateHash(password: string): string[];
        validPassword(password: string, hashedPassword: string): boolean;
        randomString(ilength: number): string;
        createPasswordRandom(email: string, pwd: string): string;
        getMd5(str: string): string;
        getIpAddress(): string;
        getIpClient(): string;
        validateEmail(email: string): boolean;
        removeSign(str, isLowerCase: any): string;
        setAlias(str: string): string;
        breakTextArea(str: string): string;
    }
}
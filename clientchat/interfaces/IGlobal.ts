interface rootScope {
    socket: { $on: any, $emit: any };
    root: string;
    trustHtml: any;
    isEmpty: any;
    isNullOrUndefined: any;
    isValidObjectId: any;
    validateEmail: any;
    slug: any;
    removeSign: any;
    validatePassword: any;
}
interface JMathType {
    typeplan: {
        hrm: 1,
        crm: 2,
        fico: 3,
        sd: 4,
        lms: 5,
        sm: 6,
        mm:7
    }
}
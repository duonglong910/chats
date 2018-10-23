module JMath {
    export enum LogType {
        Logout =0,
        Login = 1,
        Register= 2,
        UpdateInformation= 3,
        ChangePassword= 4,
        ResetPassword= 5,
        UpdateShopInformation= 6,
        InsertNewProduct= 7,
        UpdateProductInformation= 8,
        PostNews=9
    }
    export enum ErrorStatus {
        susscess = 0,
        isNull = -1,
        isEmpty = -2,
        isUndefined = -3,
        isNotEmail = -4,
        isEmailNull=-5
    }
}
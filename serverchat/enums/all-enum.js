module.exports = function (JMath) {JMath = JMath || {};

    (function (FileType) {
        FileType[FileType["Js"] = 1] = "Js";
        FileType[FileType["Css"] = 2] = "Css";
        FileType[FileType["Htm"] = 3] = "Htm";
    })(JMath.FileType || (JMath.FileType = {}));
    var FileType = JMath.FileType;



    (function (LogType) {
        LogType[LogType["Logout"] = 0] = "Logout";
        LogType[LogType["Login"] = 1] = "Login";
        LogType[LogType["Register"] = 2] = "Register";
        LogType[LogType["UpdateInformation"] = 3] = "UpdateInformation";
        LogType[LogType["ChangePassword"] = 4] = "ChangePassword";
        LogType[LogType["ResetPassword"] = 5] = "ResetPassword";
        LogType[LogType["UpdateShopInformation"] = 6] = "UpdateShopInformation";
        LogType[LogType["InsertNewProduct"] = 7] = "InsertNewProduct";
        LogType[LogType["UpdateProductInformation"] = 8] = "UpdateProductInformation";
        LogType[LogType["PostNews"] = 9] = "PostNews";
    })(JMath.LogType || (JMath.LogType = {}));
    var LogType = JMath.LogType;
    (function (ErrorStatus) {
        ErrorStatus[ErrorStatus["susscess"] = 0] = "susscess";
        ErrorStatus[ErrorStatus["isNull"] = -1] = "isNull";
        ErrorStatus[ErrorStatus["isEmpty"] = -2] = "isEmpty";
        ErrorStatus[ErrorStatus["isUndefined"] = -3] = "isUndefined";
        ErrorStatus[ErrorStatus["isNotEmail"] = -4] = "isNotEmail";
        ErrorStatus[ErrorStatus["isEmailNull"] = -5] = "isEmailNull";
    })(JMath.ErrorStatus || (JMath.ErrorStatus = {}));
    var ErrorStatus = JMath.ErrorStatus;



    (function (MessageType) {
        MessageType[MessageType["PasswordNotMatch"] = -4] = "PasswordNotMatch";
        MessageType[MessageType["UserExist"] = -3] = "UserExist";
        MessageType[MessageType["PasswordInCorrect"] = -2] = "PasswordInCorrect";
        MessageType[MessageType["UserNotExist"] = -1] = "UserNotExist";
        MessageType[MessageType["Error"] = 0] = "Error";
        MessageType[MessageType["Success"] = 1] = "Success";
        MessageType[MessageType["LoginSuccessful"] = 2] = "LoginSuccessful";
        MessageType[MessageType["RegisterSuccessful"] = 3] = "RegisterSuccessful";
        MessageType[MessageType["ChangePasswordSucessful"] = 4] = "ChangePasswordSucessful";
    })(JMath.MessageType || (JMath.MessageType = {}));
    var MessageType = JMath.MessageType;



    (function (ModalStype) {
        ModalStype[ModalStype["Primary"] = 1] = "Primary";
        ModalStype[ModalStype["Success"] = 2] = "Success";
        ModalStype[ModalStype["Info"] = 3] = "Info";
        ModalStype[ModalStype["Warning"] = 4] = "Warning";
        ModalStype[ModalStype["Danger"] = 5] = "Danger";
    })(JMath.ModalStype || (JMath.ModalStype = {}));
    var ModalStype = JMath.ModalStype;
    ;



    (function (Privacy) {
        Privacy[Privacy["Public"] = 1] = "Public";
        Privacy[Privacy["PublicAndLinkedin"] = 2] = "PublicAndLinkedin";
        Privacy[Privacy["Connections"] = 3] = "Connections";
    })(JMath.Privacy || (JMath.Privacy = {}));
    var Privacy = JMath.Privacy;
    (function (MySharingRules) {
        MySharingRules[MySharingRules["Upload"] = 1] = "Upload";
    })(JMath.MySharingRules || (JMath.MySharingRules = {}));
    var MySharingRules = JMath.MySharingRules;


};
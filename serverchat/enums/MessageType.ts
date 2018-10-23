module JMath {
    export enum MessageType {
        PasswordNotMatch= -4,
        UserExist=-3,
        PasswordInCorrect=-2,
        UserNotExist= -1,
        Error= 0,
        Success=1,
        LoginSuccessful= 2,
        RegisterSuccessful= 3,
        ChangePasswordSucessful=4
    }
}
module JMath {
    export interface JMailer {
        sender(from: string, to: string, subject: string, content: string, cb?: { (data: string): void });
        sendGmail(from: string, to: string, subject: string, content: string, cb?: { (data: string): void });
    }
}
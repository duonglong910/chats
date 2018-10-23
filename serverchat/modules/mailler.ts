module JMath {
    var path = require('path');
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    export class JMailer implements JMailer {
        constructor() {
            require(path.join(global.appRoot, 'enums', 'all-enum'))(JMath);
        }
        public img = 'http://sman.com/templates/defaults/icons/vicmon-32.png';
        public rootUrl = 'http://sman.com/';
        //
        public getTransporter() {
            var transporter = nodemailer.createTransport(smtpTransport({
                host: global.config.mail.host,
                port: global.config.mail.port,
                secure: global.config.mail.ssl,
                auth: {
                    user: global.config.mail.from,
                    pass: global.config.mail.pass
                }
            }));
            return transporter;
        }
        //
        public sendMailInvited(obj, cb?: { (data: any): void }): void {
            var transporter = this.getTransporter();
            var html = '<table style="font-family: \'Roboto\',sans-serif;font - size: 14px;line - height: 1.4;font - weight: 400;margin: 0px;background: #eeeeee;">';
            html += '<thead><tr style="margin: 0; padding: 0; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
            html += ' <td class="content-block" style= "margin: 0; padding: 0 0 20px; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '  <p><img src="' + this.img+'"></p>';
            html += ' </td> ';
            html += ' <td class="content-block" style= "margin: 0; padding: 0 0 20px; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '  <h2>Con người, giá trị thực</h2>';
            html += ' </td> ';
            html += ' </tr></thead>';
            html += '<tbody>';
            html += '<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
            html += ' <td colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += obj.content;
            html += ' </td> ';
            html += ' </tr>';
            html += '<tr style= "margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;" >';
            html += '<td  colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '<a href="' + obj.url + '" class="btn-primary" style= "margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; background-color: #348eda; border: solid #348eda; border-width: 10px 20px; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize;" > Click đồng ý tham gia</a >';
            html += '</td>';
            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            // setup email data with unicode symbols
            var mailOptions = {
                from: '"Azmanasa.com kính chào[' + obj.fullname + ']"', // sender address
                to: obj.email, // list of receivers
                subject: 'Có bạn ' + obj.name + ' Mời bạn tham gia', // Subject line
                text: 'Có bạn ' + obj.name + ' Mời bạn tham gia', // plain text body
                html: html // html body
            };
            //global.logger.debug("mailOptions==>", mailOptions, 'config', global.config.mail);
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                var err = 0;
                if (error) {
                    err = 1;
                    console.log(error);
                } else {
                    err = 0;
                    console.log('Message %s sent: %s', info.messageId, info.response);
                }
                if (typeof cb == 'function') cb({ error: err });
                return;
            });
        }
        //
        public senMailRegister(name, emailto, pwd, url, cb?: { (data: any): void }): void {
            var transporter = this.getTransporter();
            //----------------------------------------------
            var html = '<table style="font-family: \'Roboto\',sans-serif;font - size: 14px;line - height: 1.4;font - weight: 400;margin: 0px;background: #eeeeee;">';
            html += '<thead><tr style="margin: 0; padding: 0; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
            html += ' <td class="content-block" style= "margin: 0; padding: 0 0 20px; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '  <p><img src="' + this.img +'"></p>';
            html += ' </td> ';
            html += ' <td class="content-block" style= "margin: 0; padding: 0 0 20px; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '  <h2>Con người, giá trị thực</h2>';
            html += ' </td> ';
            html += ' </tr></thead>';
            html += '<tbody>';
            html += '<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
            html += ' <td colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '   Chúng tôi có thể cần gửi cho bạn thông tin quan trọng về dịch vụ của chúng tôi và điều quan trọng là chúng tôi có một địa chỉ email chính xác.';
            html += ' </td> ';
            html += ' </tr>';
            html += '<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
            html += ' <td  colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '   <div><label>Tên đăng nhập:</label><span> ' + emailto + '</span></div>';
            html += '   <div><label>Mật khẩu:</label><span> ' + pwd + '</span></div>';
            html += ' </td> ';
            html += ' </tr>';
            html += '<tr style= "margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;" >';
            html += '<td  colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '<a href="' + url + '" class="btn-primary" style= "margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; background-color: #348eda; border: solid #348eda; border-width: 10px 20px; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize;" > Xác nhận địa chỉ email của bạn</a >';
            html += '</td>';
            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            // setup email data with unicode symbols
            var mailOptions = {
                from: '"Sysman kính chào[' + name + ']" <' + global.config.mail.from + '>', // sender address
                to: emailto, // list of receivers
                subject: 'Tạo phần mềm quản lý tại sman.com thành công!', // Subject line
                text: 'Tạo phần mềm quản lý tại sman.com thành công!', // plain text body
                html: html // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                if (typeof cb == 'function') cb(info);
            });
        }
        /**
         * function senMailRegisterMember
         * @param from
         * @param to
         * @param subject
         * @param content
         * @param cb
         */
        public senMailRegisterMember(name, emailto, pwd, url, cb?: { (data: string): void }): void {
            var transporter = this.getTransporter();
            //----------------------------------------------
            var html = '<table style="font-family: \'Roboto\',sans-serif;font - size: 14px;line - height: 1.4;font - weight: 400;margin: 0px;background: #eeeeee;">';
            html += '<thead><tr style="margin: 0; padding: 0; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
            html += ' <td class="content-block" style= "margin: 0; padding: 0 0 20px; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '  <p><img src="' + this.img +'"></p>';
            html += ' </td> ';
            html += ' <td class="content-block" style= "margin: 0; padding: 0 0 20px; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '  <h2>Con người, giá trị thực</h2>';
            html += ' </td> ';
            html += ' </tr></thead>';
            html += '<tbody>';
            html += '<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
            html += ' <td colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '   Chúng tôi có thể cần gửi cho bạn thông tin quan trọng về dịch vụ của chúng tôi và điều quan trọng là chúng tôi có một địa chỉ email chính xác.';
            html += ' </td> ';
            html += ' </tr>';
            html += '<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
            html += ' <td  colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '   <div><label>Tên đăng nhập:</label><span> ' + emailto + '</span></div>';
            html += '   <div><label>Mật khẩu:</label><span> ' + pwd + '</span></div>';
            html += ' </td> ';
            html += ' </tr>';
            html += '<tr style= "margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;" >';
            html += '<td  colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
            html += '<a href="' + url + '" class="btn-primary" style= "margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; background-color: #348eda; border: solid #348eda; border-width: 10px 20px; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize;" > Xác nhận địa chỉ email của bạn</a >';
            html += '</td>';
            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            // setup email data with unicode symbols
            var mailOptions = {
                from: '"Sysman kính chào[' + name + ']" <' + global.config.mail.from + '>', // sender address
                to: emailto, // list of receivers
                subject: 'Đăng ký tài khoản azmanasa.com thành công!', // Subject line
                text: 'Đăng ký tài khoản azmanasa.com thành công!', // plain text body
                html: html // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
        }
        /**
         * @sendMailler
         * @param userinfo
         * @param title
         * @param listProducts
         * @param user
         */
        public sendMailler(userinfo, title, listProducts, user, cb) {
            if (!global.util.isNullOrUndefined(userinfo)) {
                var transporter = this.getTransporter();
                var d = new Date();
                var date = d.toISOString();
                //----------------------------------------------
                var html = '<div style="background:#e3e3e3;padding:15px 0px;"><div style="background:#fff;width:80%;margin:25px auto;border:1px solid #ccc;position:relative;">';
                html += '<table style= "font-family: \'Roboto\',sans-serif;width:100%;font-size: 14px;line-height: 1.4;font-weight: 400;margin: 0px;border-collapse: collapse;border: none;" >';
                html += '<thead style="background:#555;"><tr style="margin: 0; padding: 0; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
                html += ' <td class="content-block" style= "margin: 0;background:#555; padding:10px; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
                html += '  <p><img style="max-width:100%;" src="' + this.img+'"></p>';
                html += ' </td> ';
                html += ' <td class="content-block" style= "margin: 0;background:#555; padding:10px; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
                html += '  <div style="padding:10px;font-size:22px; color:#fff;">Con người, việc làm giá trị thực</div>';
                html += '  <div style="padding:10px;font-size:14px; color:#fff;">' + date + '</div>';
                html += ' </td> ';
                html += ' </tr></thead>';
                html += '<tbody>';
                html += '<tr style="margin: 0; padding: 0;border-bottom:3px solide #ccc; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
                html += ' <td  colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
                html += '   <div style="padding:20px;"><label>Xin chào:' + userinfo.fullname + '</label></div>';
                html += ' </td> ';
                html += ' </tr>';
                var keyclass = '';
                var tr = '';
                listProducts.forEach(function (row, key) {
                    if (key % 2 == 0) {
                        keyclass = 'background:#f0f0ee; border-bottom:1px solid #e0e0e0;';
                    } else {
                        keyclass = 'background:#fff';
                    }
                    tr += '<tr style="margin: 0; padding: 0;' + keyclass + ' font-family:\'Roboto\', Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
                    tr += ' <td colspan="2" class="content-block" style= "margin: 0; padding: 10px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
                    //
                    tr += '<table style="font-family: \'Roboto\',sans-serif;border-collapse:collapse;border: none;font-size: 14px;line-height: 1.4;font-weight: 400;margin: 0px;"> <tbody>';
                    tr += '<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
                    tr += ' <td colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
                    tr += '<a style="text-decoration:none;font-size:16px;color:#252525;" href="' + row.rootdomain + row.newurl + '.html">' + row.title + '</a>';
                    tr += ' </td> ';
                    tr += ' </tr>';
                    //row 2
                    tr += '<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
                    tr += ' <td colspan="2" class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
                    tr += '<a style="text-decoration:none;font-size:13px;color:#666;" href="' + row.rootdomain + row.companyurl + '.html">' + row.companyname + '</a>';
                    tr += ' </td> ';
                    tr += ' </tr>';

                    tr += '<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
                    tr += ' <td  class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
                    tr += '<a  style="text-decoration:none;font-size:13px;color:#666;" href="' + row.rootdomain + row.newurl + '.html">' + row.salaryname + '</a>';
                    tr += ' </td> ';
                    tr += ' <td  class="content-block" style= "margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
                    tr += '<a  style="text-decoration:none;font-size:13px;color:#666;" href="' + row.rootdomain + row.newurl + '.html">' + row.cityname + '</a>';
                    tr += ' </td> ';
                    tr += ' </tr>';
                    tr += '</tbody> </table> ';
                    tr += ' </td> ';
                    tr += ' </tr>';
                });
                html += tr;
                html += '</tbody>';
                html += '<footer style="background:#999;"><tr style="margin: 0; padding: 0; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">';
                html += ' <td colspan="2"  class="content-block" style= "margin: 0;background:#555; padding:10px; font-family:Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;" >';
                html += '  <a href="'+this.rootUrl+'" style="text-algin:center;text-decoration:none;font-size:17px;color:#fff;">Xem thêm >></a>';
                html += ' </td> ';
                html += ' </tr></footer>';
                html += '</table></div></div>';
                // setup email data with unicode symbols
                var mailOptions = {
                    from: '"Azmanasa.com thông báo [' + userinfo.fullname + ']" <' + global.config.mail.from + '>', // sender address
                    to: userinfo.email, // list of receivers
                    subject: title, // Subject line
                    text: title, // plain text body
                    html: html // html body
                };
                // send mail with defined transport object
                var objData = {
                    title: title,
                    date: date,
                    userinfo: userinfo,
                    listProducts: listProducts,
                    user: user,
                    status: 0
                };
                //
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        global.logger.error(error);
                        objData.status = 0;
                        global.modelmailer.addMailSend(objData);
                        if (typeof cb == 'function') cb(0);
                        return false;
                    }
                    global.logger.info('Message %s sent: %s', info.messageId, info.response);
                    objData.status = 1;
                    global.modelmailer.addMailSend(objData, (err, result) => {
                        global.logger.info('AddMailSend', result);
                    });
                    if (typeof cb == 'function') cb(1);
                    return true;
                });
            } else {
                objData.status = 0;
                global.modelmailer.addMailSend(objData);
                if (typeof cb == 'function') cb(0);
                return false;
            }
        }
        /**
         * function sender
         * @param from
         * @param to
         * @param subject
         * @param content
         * @param cb
         */
        public sender(from: string, to: string, subject: string, content: string, cb?: { (data: string): void }): void {

            var transporter = nodemailer.createTransport(smtpTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: from,
                    pass: 'longvanduong910'
                }
            }));
            // setup email data with unicode symbols
            var mailOptions = {
                from: '"Hi!" <' + from + '>', // sender address
                to: to, // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world ?', // plain text body
                html: '<b>Hello world ?</b>' // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
        }

        //
        public sendGmail(from: string, to: string, subject: string, content: string, cb?: { (data: string): void }): void {
            global.logger.fatal("mailler sending...");
            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: from,
                    pass: 'longvanduong'
                }
            });

            // setup email data with unicode symbols
            var mailOptions = {
                from: '"Hi!" <' + from + '>', // sender address
                to: to, // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world ?', // plain text body
                html: '<b>Hello world ?</b>' // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
        }
        //
        public gmail(from: string, to: string, subject: string, content: string, cb?: { (data: string): void }): void {
            var send = require('gmail-send')({
                user: from,               // Your GMail account used to send emails 
                pass: 'longvanduong',             // Application-specific password 
                to: '"User" <' + to + '>',      // Send back to yourself 
                // from:   '"User" <user@gmail.com>'  // from: by default equals to user 
                // replyTo:'user@gmail.com'           // replyTo: by default undefined 
                subject: 'test subject',
                text: 'test text',
                html: '<b>html text text</b>'
            });

            // var file = './demo-attachment.txt';        // File to attach 

            // Override any default option and send email 
            send({
                subject: 'Hello '   // Override value set as default  
                // files: [file]                // String or array of strings of filenames to attach 
            }, function (err, res) {
                console.log('* [example1] send(): err:', err, '; res:', res);
            });
        }
    }
}

module.exports = new JMath.JMailer();
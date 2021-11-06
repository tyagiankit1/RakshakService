const nodemailer = require("nodemailer");
const logger = require('../../logger/logger');


const transporter = nodemailer.createTransport({
    host: process.env.MailerHost,
    port: process.env.MailerPort,
    auth: {
        user: process.env.MailerUserName,
        pass: process.env.MailerPassword
    }
});


exports.sendMail = (request, sendTo) => {    
    logger.info("Sending mail to::::: "+ sendTo); 
    logger.info("Request::::: "+ JSON.stringify(request)); 
    let info = transporter.sendMail({
        from: request.from, // sender address
        to: [sendTo], // list of receivers
        subject: request.subject, // Subject line
        html: request.body, // html body
        attachments: [{
            filename: 'XeniumNetwork.png',
            path: './public/mailer/logo.png',
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }]
    });
    console.log("Message sent: %s", info);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
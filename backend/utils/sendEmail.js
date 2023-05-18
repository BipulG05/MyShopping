const nodeMailer = require('nodemailer');

const sendEmail = async (options) =>{

    // console.log(process.env.SMPT_PORT,process.env.SMPT_MAIL,process.env.SMPT_PASSWORD)
    const transporter = nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        service:process.env.SMPT_SERVICE,
        port:process.env.SMPT_PORT,
        secure:false,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        },
    });
    // console.log("options.message",options.message)
    const mailoptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
        html:`<b>hello from myshop ${options.message}</b>`
    };
    await transporter.sendMail(mailoptions);



     // let testAccount = await nodemailer.createTestAccount();

    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //     user: testAccount.user, // generated ethereal user
    //     pass: testAccount.pass, // generated ethereal password
    //     },
    // });

    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: testAccount, // sender address
    //     to: options.email, // list of receivers
    //     subject: options.subject, // Subject line
    //     text: options.message, // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // });

    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendEmail
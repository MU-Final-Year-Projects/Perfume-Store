
const nodemailer = require('nodemailer');


module.exports = async (email, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'dev.codexpro@gmail.com',
            pass: 'allfor1-forAll',
        }
    });

    let mailOptions = {
        from: 'dev.codexpro@gmail.com',
        to: 'tamimayesmin84@gmail.com',
        subject: 'Test - NodeMailer',
        text: 'Hello World!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });


};
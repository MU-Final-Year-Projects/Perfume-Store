
const nodemailer = require('nodemailer');


module.exports = async (email, subject, text) => {
    try {
        // const transporter = nodemailer.createTransport({
        //     host: process.env.HOST,
        //     service: process.env.SERVICE,
        //     port: Number(process.env.EMAIL_PORT),
        //     secure: Boolean(process.env.SECURE),
        //     auth: {
        //         user: process.env.USER,
        //         pass: process.env.PASS,
        //     },
        // });

        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: 'yesmintamima1@gmail.com',
                //pass: 'tnoowlmqofyefraa'
                pass: 'sxeiufstsqnmaphq'
            }
        });

        console.log("I do work !!!", process.env.USER, process.env.PASS, subject, email, text);
        console.log(transporter);

        await transporter.sendMail({

            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};


const fetch = require("node-fetch")
const nodemailer = require('nodemailer')
const config = require('./config.json')

module.exports = {
    sendEmail: async function (body) {

        const emailConfig = config.emailClient

        const transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: 465,
            secure: true,
            auth: emailConfig.auth
        });

        var mailOptions = {
            from: '"BelTicket"' + emailConfig.email,
            to: body.email,
            subject: body.subject,
            html: body.html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
handleErrors = response => {
    if (!response.ok) {
        throw new Error("Request failed " + response.statusText)
    }
    return response
}

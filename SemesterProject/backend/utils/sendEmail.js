const nodeMailer = require('nodemailer');

const ENV = require('../config/emailConfig');
const Mailgen = require('mailgen');


async function sendEmail(username, userEmail, text, subject) {
    console.log(username, userEmail, text, subject);
    const Email='ecomapp09@gmail.com'
    const password='a-z827567'
    // const Email = 'khareedofarokhtp@gmail.com'
    // const password="dwcbagmynwnkespb"
    // Check if the email address is valid
    if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(userEmail)) {
      throw new Error('Invalid email address');
    }
  
    // Check if the SMTP settings are correct
    const config = {
        service: 'gmail',
        auth: {
            user: Email,
            pass: password
        }
    };
  
    // Create a new transporter
    const transporter = nodeMailer.createTransport(config);
  
    // Create a new Mailgen instance
    const MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Ecom app',
            link: 'https://mailgen.js/'
        }
    });
  
    // Create a new response object
    const response = {
        body: {
            name: username,
            intro: 'From Ecom App',
            table: {
                data: [
                    {
                        Mail: text
                    }
                ]
            },
            outro: 'Thank you for choosing us'
        }
    };
  
    // Generate the email
    const mail = MailGenerator.generate(response);
  
    // Create a new message object
    const message = {
        from: Email,
        to: userEmail,
        subject: subject || 'OTP for reset password',
        html: mail
    };
  
    // Send the mail
    try {
        await transporter.sendMail(message);
        return { message: 'Mail sent successfully... If you don\'t get it, please check your Spam folder!' };
    } catch (error) {
        return { error: 'Error in sending mail' };
    }
}
module.exports = sendEmail;
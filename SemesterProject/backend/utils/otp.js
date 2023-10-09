const otpGenerator =require('otp-generator')
const sendEmail=require('.//sendEmail')

const generateOTPCode = () => {
    return otpGenerator.generate(4, { upperCase: false, specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false });
}

 async function generateOTP(req, res) {

    const { email, username } = req.body

    const OTP = generateOTPCode()

    const text = `Dear ${username}!<br><br>Your OTP is <strong>${OTP}</strong>`
    const subject = "OTP for reset password"

    sendEmail(username, email, text, subject).then((msg) => {
        console.log(msg)
        res.send({ msg, OTP })
    }).catch((error) => {
        console.log(err)
        res.send({ error, OTP })
    })
}

 async function registerSuccesFull(req, res) {
    const { email, username } = req.body

    const text = `You have successfully registered to our App Thank you for choosing us!🤗🤗`
    const subject = "Registration Successfull"

    sendEmail(username, email, text, subject).then((msg) => {
        console.log(msg)
        res.send({ msg })
    }).catch((error) => {
        console.log(err)
        res.send({ error })
    })
}

 async function OTPforDelivery(req, res) {
    const { email, username } = req.body;
    const OTP = generateOTPCode();
    const text = `Dear ${username}!<br><br>Your OTP to confirm delivery is <strong>${OTP}</strong>`;
    const subject = "OTP for delivery";

    sendEmail(username, email, text, subject).then((msg) => {
        console.log(msg);
        res.send({ msg, OTP });
    }).catch((error) => {
        console.log(err);
        res.send({ error });
    });
}
module.exports ={ generateOTP,registerSuccesFull,OTPforDelivery};
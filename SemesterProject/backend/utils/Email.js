const nodeMailer = require('nodemailer');
const Email= async (optons)=>{
    const transporter=nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user: "appecom865@gmail.com",
            pass:"jail bump unbv vboe"
            
        }
    })
    const emailOptions={
        from:process.env.EMAIL_USERNAME,
        to:optons.email,
        subject:optons.subject,
        text:optons.message
    }
    await transporter.sendMail(emailOptions)
}
module.exports=Email;
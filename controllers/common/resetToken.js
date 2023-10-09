const User = require("../../models/User");
const { mailSender } = require("../../utils/mailSender");
const crypto = require('crypto');
require('dotenv').config();

exports.resetToken = async(req,res)=>{
    try{
          const{email} = req.body;
          
          const resettoken = crypto.randomBytes(10).toString('hex');

          const baseurl = process.env.FRONTEND;

          const url = `${baseurl}reset?token=${resettoken}`
         
          
          const user = await User.findOne({email:email});

          user.resetToken = resettoken;
          user.resetTokenExpiry = new Date(Date.now() + 10*60*60*1000)

          const mailsent =await mailSender('Password Reset',`<div class="container">
    <a href="https://campusconnect.com">
        <img class="logo" src="https://your-campusconnect-logo-url.com/logo.png" alt="CampusConnect Logo">
    </a>
    <div class="message">Password Reset</div>
    <div class="body">
        <p>Dear User,</p>
        <p>Thank you for using CampusConnect. To reset your password, please click on the following link:</p>
        <a class="reset-link" href="${url}">Reset Password</a>
        <p>This link will expire within 10 minutes. If you did not request a password reset, please disregard this email.</p>
    </div>
    <div class="support">
        If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:support@campusconnect.com">support@campusconnect.com</a>. We are here to help!
    </div>
</div>`,email);

          res.status(200).json({
            success:true,
            message:'mail success',
            mailsent:mailsent
          })
    }
    catch(e)
    {
        res.status(500).json({
            success:false,
            message:'Error in reset token',
            error:e.message
        })
    }
}
const User = require("../../../models/User");
const {otpgen} = require('../../../utils/Otpgen')
const {mailSender} = require('../../../utils/mailSender')
const {otpTemplate} = require('../../../templates/emailVerification');

const bcrypt = require('bcrypt');

exports.mailConfirmation = async(req,res)=>{


      
      try{
      const email= req.body.email;
   const ExistingUser = await User.findOne({email:email});
   
   if(ExistingUser)
   {
    return res.status(410).json({
    success:false,
    message:'User already exists'
    })
   }
   
   const otp = otpgen();
   const user= User.create({
   email:email, 
   otp:otp,
   expiresIn: new Date(Date.now() + 600000),
   });
   
   mailSender('Sign up verification' , otpTemplate(otp), email)
   
   
    res.status(200).json({
    success:true,
    message:'otp sent at mail',
    user:user
    })
   }
       
  catch(e)
      {
       res.status(500).json({
     success:false,
     message:' something went wrong at mailconfirm controller',
     error:e.message
   })
 }
}


exports.sendotp = async(req,res)=>{
  try{
      const {email,userotp} = req.body;
      
      //use local storage to save user for speed up
      const user= await User.findOne({email:email});
      
      const expiry = user.expiresIn;
      const dbotp  = user.otp;
       
       
       
      if(expiry<Date.now()) 
      {
       return res.status(401).json({
       success:false,
       message:'OTP expired regenrate the OTP'
       })
      }
      
      // console.log("user" + userotp)
      //  console.log("db" + dbotp)
      if(userotp!==dbotp)  
      return res.status(403).json({
      success:false,
      message:'Invalid OTP'
      })
     
     res.status(200).json({
     success:true,
     message:'OTP check successful'
     })
  }
  catch(e)
  {
   res.status(500).json({
     success:false,
     message:' something went wrong at sendotp controller',
     error:e.message
  })
}
}

exports.resendOtp = async(req,res)=>
{
 try{
 const email= req.body.email;
  const otp = otpgen();
  
  const user = await User.findOne({email:email});
  user.otp = otp;
  user.expiresIn = new Date(Date.now() + 600000)
  mailSender('Sign up verification' , otpTemplate(otp), email)
  await user.save();
 }
 catch(e)
 {
   res.status(500).json({
   success:false,
   message:'error in resend otp'})
 }
  
  res.status(200).json({
  success:true,message:'resend OTP successful'})
  
}

exports.SignUp = async(req,res)=>{ 
  try
  {
    const role = req.body.role;
  
  
  const{ name,password,confirmpassword,email,prn} = req.body;
     
     const user = await User.findOne({email:email});
     
     if(!user) return res.status(500).json({
     success:false,
     message:'User not found'
     })
     
     if(password !== confirmpassword ) return res.status(410).json({
     success:false, message:'passwords not matching'})
     
     const hashedpassword = await bcrypt.hash(password,10);
     
     user.name = name;
     user.password = hashedpassword;
     user.prn = prn;
     user.role = role;
     await user.save()
   return res.status(200).json({
    success:true,
    message:'user data saved successfully',
    user: {name:user.name , role:user.role ,}
    })
  
  
  
  }
  catch(e)
  {
   res.status(500).json({
   success:false,
   message:' something went wrong at signup controller',
   error:e.message
   })
  }
  
}
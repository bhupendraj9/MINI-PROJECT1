const OtpGenerator = require('otp-generator')


exports.otpgen=()=>{
 const otp = OtpGenerator.generate(6, { upperCase: false, specialChars: false ,lowerCaseAlphabets:false,upperCaseAlphabets:false});
 return otp;
}
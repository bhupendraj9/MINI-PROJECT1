const User = require("../../../models/User");
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')
exports.Login= async(req,res)=>{
    try{
       const {email,password} = req.body;

       if(!email || !password) 
       {
        return res.status(404).json({
            success:false,
            message:'Please provide all required data',
        })
       }
       const user = await User.findOne({email:email});
    
       if(!user)
       {
        return res.status(404).json({
            success:false,
            message:'User not found'
        })
       }
       
      
       if(!bcrypt.compare(password,user.password))
       {  
         
          return res.status(400).json({
            success:false,
            message:'Wrong password'
          })
       }

       //creating a token 
       const token =  jwt.sign({email:email,role:user.role,id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});

        
       res.cookie('token',token,{expires: new Date(Date.now() + 30*24*60*60*1000)});
       
       res.status(200).json({
        success:true,
        message:'Login successful',
        token:token,
        user:user
       })

    }
    catch(e)
    {  
    console.log(e);
        res.status(500).json({
            success:false,
            message:'Error while Login',
            error:e.message
        })
    }
} 
const mongoose=require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL
const dbConnect =()=>{
    mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("database connected")
    }).catch((err)=>{console.log(err.message)})
}

module.exports =dbConnect;
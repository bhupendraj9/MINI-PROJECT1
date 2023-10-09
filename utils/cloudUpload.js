const cloudinary = require('cloudinary').v2;

exports.cloudUpload = async(file)=>{
    try{
         
        const response = await cloudinary.uploader.upload(file.tempFilePath,{folder:'CampusConnect'});

        return response.secure_url;
    }
    catch(e)
    {
        console.log("error occured during file upload to cloudinary")
    }
}
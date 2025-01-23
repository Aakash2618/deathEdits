// require('dotenv').config();
const cloudinary=require("cloudinary").v2
const fs=require("fs")


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary=async(files)=>{
    try {
        const urls=[]
        if(!files) return null;
        for( const file of files){
          const result = await cloudinary.uploader.upload(file.path)
          urls.push(result.secure_url)
          if(urls || urls.length >0) fs.unlink(file.path,(err)=>{if(err){console.log("error deleting file: ",err)}else{console.log("file deleted successfully.")}})
        }
        return urls;

        // const response = await cloudinary.uploader.upload(localFilePath);
        // return response;
        // const uploadPromises =await files.map(file => {
        //   return new Promise((resolve, reject) => {
        //     const uploadStream = cloudinary.uploader.upload(
        //       file.path,
        //       (error, result) => {
        //         if (error) reject(error);
        //         else resolve(result.secure_url);
        //       }
        //     );
        //    return uploadPromises;
        //   });
        //   });
        
    } catch (error) {
        console.log("error in uploading image:- ", error)
        fs.unlink(localFilePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File successfully deleted');
            }
          });
          return null;
    }

}

// export {uploadOnCloudinary}
module.exports={uploadOnCloudinary}
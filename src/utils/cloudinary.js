import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET
  });
  

//   const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if(!localFilePath) return null
//         // upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type : "auto"
//         })
//         // file has been uploaded successfully
//         console.log('File is uploaded on cloudinary', response.url)
//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//     }
//   }

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Log the local file path to ensure it's correct
        console.log('Local file path:', localFilePath);

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Log the response to see if the upload was successful
        console.log('Cloudinary response:', response);

        // file has been uploaded successfully
        console.log('File is uploaded on cloudinary', response.url);

        fs.unlinkSync(localFilePath)
        
        return response;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);

        // Handle the error, you may want to throw it again if necessary
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        return null; // or throw error;
    }
};


  export {uploadOnCloudinary}
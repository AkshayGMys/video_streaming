import { v2 as cloudinary } from "cloudinary";
import fs from "fs";//Fs is the file system module of node js which allows us to work with the file system on our computer. We will use it to delete the file from our server after uploading it to cloudinary.

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    console.log(
      "File has been uploaded on Cloudinary successfully",
      response.url
    );
    return response;
  } catch (err) {
    //Here the file is in local server but could not be sent to the Cloudinary
    fs.unlinkSync(localFilePath); 
    //Removing the file from our server though it is not uploaded on Cloudinary because we don't want to keep the file on our server due to it's corrupt status if it is not uploaded on Cloudinary.
    return null;
  }
};
export { uploadOnCloudinary };

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

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
    //Removing the file from our server .It is sync as anything should happen only after the unlinking is completed.
    return null;
  }
};
export { uploadOnCloudinary };

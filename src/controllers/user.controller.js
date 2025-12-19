import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"; //This model is made through Mongoose , so we can use this to create update and delete the user objects in the MongoDB database.
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import ApiResponse  from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //THIS IS THE LOGICAL THINKING FOR WRITING A REGISTER USER

  //Get the data from the request body.
  //Validate the data , like not emplty, correct format etc.
  //Check if user already exists(we are using username or email to be unique).
  //Avatar and cover image exists or not ?
  //Are the image url's generated or not?
  //Make an user object and - Put that data into the database.
  //Remove password and refresh token from the user object before sending response.
  //Return the success code if the User was created successfully.
  //handle the database insertion part with try,catch which is being done by the asyncHandler
  const {fullName , email ,username,password} = req.body;
  console.log("email : ", email);

  if(
    [fullname,email,username,password].some((field) => field?.trim() === "")
    //This some function runs on every element of the array and checks if any field is empty string after trimming
  )
  {
    throw new ApiError(400 , "All fields are required");
  }

  
  //Operators using $
   const existedUser = User.findOne({$or:[{username,email}]});//Array of conditions
   if(existedUser)
      throw new ApiError(409 , "User with same email or username already exists");
  
   //We are getting the paths of the images that has been saved by the multer.
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;
  if(!avatarLocalPath) throw new ApiError(400 , "Avatar files is required");

  //upload the image to cloudinary
  const cloudinaryAvatarResponse = await uploadOnCloudinary(avatarLocalPath);
  const cloudinaryCoverResponse = await uploadOnCloudinary(coverLocalPath);

  if(!cloudinaryAvatarResponse) throw new ApiError(400 , "Image uploading failed");

  const user = User.create({
     fullname ,
     avatar : cloudinaryAvatarResponse.url ,
     coverImage : coverImage?.url || "" ,
     email,
     password,
     username : username.toLowerCase()

  });
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if(!createdUser)throw new ApiError(500,"Something went wrong while registering the user");
  console.log(createdUser);

   res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
   );
});

export { registerUser };
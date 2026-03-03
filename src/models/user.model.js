import mongoose,{Schema}  from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  username : {
    type : String, 
    required : true ,
    unique : true,
    lowercase : true,
    trim : true,
    index : true,
  },
  email : {
    type : String, 
    required : true ,
    unique : true,
    lowercase : true,
    trim : true,
  },
   fullname : {
    type : String, 
    required : true ,
    trim : true,
    index : true,
  },
  avatar : {
    type : String,//URL from out buckets 
    required : true,
  },
  coverImage : {
    type : String,
    required : false,
  },
  watchHistory : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Video",
  }],
  password : { //Encrypted password with bcrypt
    type : String,
    required : [true,"Password is required"],
  },
  refreshToken : {
    type : String,
  }
},{timestamps:true});

//Do not write arrow functions here as we need the this keyword and the arrow functions do not have the reference to this 
userSchema.pre("save" , async function (next){
  if(this.isModified("password")) //so that the password is hashed only when it is modified and not when we are updating other fields
  {
    this.password = await bcrypt.hash(this.password , 10); //password and number of rounds the algo has to run on the password.
  }
  next();
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password , this.password); //This return true or false here.
};

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {//This this here has reference to the user document which is trying to generate the access token and we can get the details of that user from this this keyword.If we use arrow function here then this will not have the reference to the user document and we will not be able to get the details of the user from this keyword.
    //this basically has this._id , this .email , this.username , this.fullname etc. as we have defined in the userSchema
      _id : this._id,
      email : this.email,
      username : this.username,
      fullname : this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,  
    {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
};

userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
    {
      _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
  )
};

export const User = mongoose.model("User" , userSchema);

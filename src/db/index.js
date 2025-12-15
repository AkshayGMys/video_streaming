import mongoose  from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () =>{
    try{
      console.log(process.env.MONGODB_URI);
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
      console.log(`\n Mongo DB connected\n DB HOST : ${connectionInstance.connection.host}`);
    }
    catch(error)
    {
      console.log("ERROR :" , error);
      process.exit(1);
    }
}

export default connectDB;
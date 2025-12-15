import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/index.js';
const app= express();
dotenv.config({
  path : './.env'
})
connectDB()
.then(app.listen(process.env.PORT || 5000),()=>{
  console.log("Server is running on port",process.env.PORT || 5000);
})
.catch(error){
  console.log("DB CONNECTION ERROR :" , error.message);
  process.exit(1);
}




























//This is called iffys where the function is written and executed immidiately
// (async ()=>{
//   try{
//     await mongoose.connect(`${process.env.MONGODB_URI}/${constants.DB_NAME}`);
//     app.on("error" , (error)=>{
//       console.log("ERROR" , error);
//       throw error
//     })

//     app.listen(process.env.PORT , ()=>
//     {
//       console.log(`Process is listening on {process.env.PORT}`)
//     })
//   }
//   catch(error)
//   {
//     console.log("ERROR : " , error);
//   }
// })()



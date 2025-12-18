import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser';  
import { SIZE } from './constants.js';

const app = express();

app.use(cors(
  {
    origin : process.env.CORS_ORIGIN,
    credentials : true 
    // Allow credentials to b sent like cookies , auth etc.
  }
));

app.use(express.json({ limit : SIZE //Limits the size of json data that can be sent to server 
}
));
app.use(urlencoded({ extended : true , limit : SIZE}));
//This is used to parse data from the url itself as the brower has default way of encoding data in url where space is reaplace by + or %20.
app.use(express.static('public')); //To serve static files like images ,css ,js etc.
app.use(cookieParser()); //To parse cookies from the request object


//Import the routes ,make sure you import here only and not on top. that is the standard convention.
import userRouter from './routes/user.routes.js' ;

//Route declarations
app.use("/api/v1/users", userRouter); //I am saying that all the user realted routes are in the userRouter and the base url for that is /api/v1/users



export default app;
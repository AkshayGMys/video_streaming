import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser';  
import { SIZE } from './constants';
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
export default app;
import { Router } from 'express'; // This aint a default import man
import { registerUser } from '../controllers/user.controller.js';
import {upload} from "../middlewares/multer.midldleware.js"


const router = Router();
router.route('/register').post(
  //This accepts two images befpre registerUser is touched basically
  upload.fields([
    {
      name : "avatar",
      maxCount : 1
    },
    {
       name : "coverImage",
       maxCount : 1
    }
  ]),
  registerUser
); // If url is /api/v1/users/register , then this registerUser funciton is called.
console.log("✅ user.routes.js loaded");



export default router;
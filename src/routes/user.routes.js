import { Router } from 'express'; // This aint a default import man
import { registerUser } from '../controllers/user.controller.js';



const router = Router();
router.route('/register').post(registerUser); // If url is /api/v1/users/register , then this registerUser funciton is called.
console.log("✅ user.routes.js loaded");



export default router;
//Registering API
import express from "express";
//Express enables you to build server applications in Node.js. 

const router = express.Router();

import { signup, signin, googleSignIn } from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);

export default router;

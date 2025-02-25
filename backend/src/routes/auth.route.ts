 import express from "express";
 import authController from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";
 
 
 const authRouter = express.Router();


 authRouter.get("/me", protectRoute,authController.getUser)

 authRouter.post("/login", authController.login)

 authRouter.post("/logout", authController.logout)

 authRouter.post("/signup", authController.signup)


export default authRouter
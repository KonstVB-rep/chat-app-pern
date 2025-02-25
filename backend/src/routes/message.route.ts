import express from "express";
import messageController from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";

 
 
const messagesRouter = express.Router();

messagesRouter.post("/send/:id", protectRoute, messageController.sendMessage)
messagesRouter.get("/conversations", protectRoute, messageController.getSidebarUsers )
messagesRouter.get("/:id", protectRoute, messageController.getMessages)

export default messagesRouter
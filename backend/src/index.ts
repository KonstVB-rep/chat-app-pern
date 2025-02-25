import express from 'express';
import authRouter from './routes/auth.route.js';
import messagesRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import "dotenv/config";
import { app, server } from './socket/index.js';

const PORT = process.env.PORT || 5001

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/messages', messagesRouter)

server.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
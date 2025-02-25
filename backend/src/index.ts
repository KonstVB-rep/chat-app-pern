import express from 'express';
import authRouter from './routes/auth.route.js';
import messagesRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import "dotenv/config";
import { app, server } from './socket/index.js';
import path from 'path';

const PORT = process.env.PORT || 5001
const __dirname = path.resolve();

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/messages', messagesRouter)

if(process.env.NODE_ENV !== 'development') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

server.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
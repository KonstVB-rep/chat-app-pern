import express from 'express';
import authRouter from './routes/auth.route.js';
import messagesRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import "dotenv/config";


const chatApp = express();
const PORT = 5000

chatApp.use(cookieParser())
chatApp.use(express.json())

chatApp.use('/api/auth', authRouter)
chatApp.use('/api/messages', messagesRouter)

chatApp.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
import jwt, { JwtPayload } from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import prisma from "../../db/prisma.js";
import { handleError } from "../utils/handleError.js";

interface DecodedToken extends JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                username: string;
                fullName: string;
                profileImage: string;
            };
        }
    }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({error: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            },
            select: {
                id: true,
                username: true,
                fullName: true,
                profileImage: true
            }
        });
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = user; // Добавляем пользователя в `req`

        next();
    } catch (error: any) {
        console.log("Error in protectRoute middleware: ", error.message);
        handleError(res, error);
    }
}
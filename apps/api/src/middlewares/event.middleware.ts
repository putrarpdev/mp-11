import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Event } from "@/types/express/event";

export class EventMiddleware {
    verifyToken = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer", "");

            if (!token) throw new Error("Missing Token");

            const isToken = verify(token, String(process.env.API_KEY));
            if (!isToken) throw new Error("Unauthorized");

            req.event = isToken as Event;

            next();
        } catch (err) {
            next(err)
        }
    }
}
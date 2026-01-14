import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors/HttpError";
import jwt from "jsonwebtoken";


const JWT_SECRET = 'SUPER_SECRET_KEY';

export interface  AuthPayload {
    userId: number;
    role: "USER" | "ADMIN";
}

export function authMiddleware(
    req: Request,
    res:Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new HttpError(401, 'Authorization header missing');
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
        throw new HttpError(401, 'Token missing');
    } 

    try {
        const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
        
        req.user = payload;
        
        next();
    } catch (err) {
        throw new HttpError(401, 'Invalid token');
    }   
}
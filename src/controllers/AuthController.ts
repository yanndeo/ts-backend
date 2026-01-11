import { AuthService } from "../services/AuthService";
import { Request, Response, NextFunction } from "express";


const users: any[] = [];
const authService = new AuthService(users);

export class AuthController {

    static async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { email, password, isAdmin } = req.body;

        try {
            const user = await authService.register(email, password, isAdmin);

            return res.status(201).json(user);
        } catch (error) {
            return next(error);
        }
    }



    static async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { email, password } = req.body;

        try {
            const token = await authService.login(email, password);

            return res.json({ token });
        } catch (error) {
            return next(error);
        }
    }   

}
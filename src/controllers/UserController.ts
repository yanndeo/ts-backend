import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { User } from '../models/User';
import { CreateUserSchema } from "../dtos/CreateUserDto";


const userService = new UserService();



export class UserController {

    static create(req: Request, res: Response): Response {
        const result = CreateUserSchema.safeParse(req.body);

        if (! result.success) {
            return res.status(400).json({
                error: "invalid request body",
                details: result.error.format()
            })
        }

        const {email, isAdmin} = result.data;

        const user = userService.createUser(email, isAdmin);

        return res.status(201).json(user);
    }


    static getAll(req: Request, res: Response): Response {

        return res.json(userService.getAll());
    }

    static getById(req: Request, res: Response): Response {
        const userId = Number(req.params.id)

        if (Number.isNaN(userId)) {
            return res.status(400).json({ error: "invalid id"});
        }

        const user = userService.getById(userId);

        if(!user) {
            return res.status(404).json({error: "user not found"});
        }

        return res.json(user);
    }

}
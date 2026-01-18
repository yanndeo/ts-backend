import { UserService } from "../services/UserService";
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { CreateUserSchema } from "../dtos/CreateUserDto";
import { HttpError } from "../errors/HttpError";
import { UserId } from "../values-objects/UserId";
import { Email } from "../values-objects/Email";


const userService = new UserService();


export class UserController {

    static create(req: Request, res: Response): Response {
        const result = CreateUserSchema.safeParse(req.body);

        if (! result.success) {
            return res.status(400).json({ error: "invalid request body"});
        }

        const {email, password, isAdmin} = result.data;

        const user = userService.createUser(
            Email.create(email),
            password,
            isAdmin
        );

        return res.status(201).json(user);
    }


    static getAll(req: Request, res: Response): Response {

        return res.json(userService.getAll());
    }

    static getById(req: Request, res: Response): Response {
        const userId = UserId.create(Number(req.params.id));

        const user = userService.getById(userId);

        if(!user) {
            return res.status(404).json({error: "user not found"});
        }

        return res.json(user);
    }


    static delete(req: Request, res: Response): Response {
        const userId = UserId.create(Number(req.params.id));

        const user = userService.getById(userId);

        if(!user) {
            return res.status(404).json({error: "user not found"});
        }

        //userService.deleteUser(userId);

        return res.status(204).send();
    }

}


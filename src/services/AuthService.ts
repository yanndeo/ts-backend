import { HttpError } from "../errors/HttpError";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const JWT_SECRET = 'SUPER_SECRET_KEY';

export class AuthService {

    constructor(private users: User[]) {}

    async register(
        email: string,
        password: string,
        isAdmin: boolean = false
    ): Promise<User> {
        const existingUser = this.users.find(user => user.email === email);

        if (existingUser) {
            throw new HttpError(409, 'User already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: this.users.length + 1,
            email,
            passwordHash,
            role: isAdmin ? "ADMIN" : "USER"
        };

        this.users.push(newUser);

        return newUser;
    }

    async login(email: string, password: string): Promise<string> {
        const user = this.users.find(user => user.email === email);

        if (!user) {
            throw new HttpError(401, 'Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new HttpError(401, 'Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return token;
    }

}
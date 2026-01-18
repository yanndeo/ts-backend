import { Email } from "../values-objects/Email";
import { UserId } from "../values-objects/UserId";

export interface User {
    id: number;
    email: string;
    passwordHash: string;
    role: "USER" | "ADMIN";
}


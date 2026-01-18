import { User } from "../models/User";
import { Email } from "../values-objects/Email";
import { UserId } from "../values-objects/UserId";

export class UserService {

    private users: User[] = [];

    private currentId = 1;


    createUser(email: Email, passwordHash: string, isAdmin: boolean): User {
        const user: User = {
            id: this.currentId++,
            email: email.getValue(),
            passwordHash,
            role: isAdmin ? "ADMIN" : "USER"
        };

        this.users.push(user);

        return user;
    }


    getAll(): User[] {
        return this.users;
    }
    

    getById(id: UserId): User | undefined {
        return this.users.find(u => u.id === id.getValue());
    }
}
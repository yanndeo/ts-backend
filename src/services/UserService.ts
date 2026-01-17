import { User } from "../models/User";

export class UserService {

    private users: User[] = [];

    private currentId = 1;


    createUser(email: string, passwordHash: string, isAdmin: boolean): User {
        const user: User = {
            id: this.currentId++,
            email,
            passwordHash,
            isAdmin,
        };

        this.users.push(user);

        return user;
    }


    getAll(): User[] {
        return this.users;
    }
    

    getById(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }
}
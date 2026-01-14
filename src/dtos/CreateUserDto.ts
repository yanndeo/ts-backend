import { z } from "zod";


export const CreateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    isAdmin: z.boolean()
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
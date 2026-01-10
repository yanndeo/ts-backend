import { z } from "zod";


export const CreateUserSchema = z.object({
    email: z.string().email(),
    isAdmin: z.boolean()
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
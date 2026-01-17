import { Permission } from "../permissions";

type Role = "USER" | "ADMIN";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    ADMIN: [
        Permission.DELETE_USER,
        Permission.READ_USER,
        Permission.DELETE_ANY_USER,
        Permission.READ_POST,
        Permission.DELETE_POST,
    ],

    USER: [
        Permission.READ_USER,
        Permission.READ_POST,
        Permission.EDIT_POST,
    ],
};
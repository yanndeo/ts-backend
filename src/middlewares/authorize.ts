import { Permission } from "../permissions";
import { Request, Response, NextFunction } from "express";
import { UserPolicy } from "../policies/UserPolicy";

export function authorize(permission: Permission) {

    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const targetUserId = Number(req.params.id) ?? undefined;

        if (!user) {
            return res.status(401).json({ error: "Unauthenticated" });
        }

        const allowed = UserPolicy.can(
            user,
            permission,
            targetUserId // Assuming target user ID is in params
        );

        if (!allowed) {
            return res.status(403).json({ error: "Forbidden" });
        }

        next();
    }
}
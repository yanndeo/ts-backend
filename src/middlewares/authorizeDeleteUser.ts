import { NextFunction, Request, Response } from "express";
import { UserPolicy } from "../policies/UserPolicy";
import { Permission } from "../permissions";

export function authorizationDeleteUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authUser = req.user;

    if (!authUser) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const targetUserId = Number(req.params.id);

    if (Number.isNaN(targetUserId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    const canDelete = UserPolicy.can(authUser, Permission.DELETE_USER, targetUserId);

    if (!canDelete) {
        return res.status(403).json({ error: "Forbidden" });
    }

    next();

}
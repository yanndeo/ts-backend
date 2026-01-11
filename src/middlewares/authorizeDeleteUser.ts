import { NextFunction, Request, Response } from "express";

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

    if (!authUser.isAdmin && authUser.userId !== targetUserId) {
        return res.status(403).json({ error: "Forbidden: insufficient permissions" });
    }

    next();

}
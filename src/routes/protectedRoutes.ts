import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware';
import { Request, Response } from "express";

const router = Router();

router.get("/profile", authMiddleware, (req: Request, res: Response) => {
    return res.json({ 
        message: `Access granted to user`,
        user: req.user
     });
});

export default router;

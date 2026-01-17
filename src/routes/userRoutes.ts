import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authorize";
import { Permission } from "../permissions";

const router = Router();

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);

router.delete(
  "/users/:id",
  authMiddleware,
  authorize(Permission.DELETE_USER),
  UserController.delete
);


export default router;

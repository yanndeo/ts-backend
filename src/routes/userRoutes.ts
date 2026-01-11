import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizationDeleteUser } from "../middlewares/authorizeDeleteUser";

const router = Router();

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);

router.delete(
  "/users/:id",
  authMiddleware,
  authorizationDeleteUser,
  UserController.delete
);


export default router;

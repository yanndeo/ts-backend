import express from "express";
import userRoutes from "./routes/userRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import protectedRoutes from "./routes/protectedRoutes";

export const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/protected", protectedRoutes);

app.use(errorMiddleware);


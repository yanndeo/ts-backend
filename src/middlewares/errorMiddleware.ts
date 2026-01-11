import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors/HttpError";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next:NextFunction
): Response {

    if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message});
    }

    console.error('unhandled error: ', err);

    return res.status(500).json({ error: "internal server error" });
}
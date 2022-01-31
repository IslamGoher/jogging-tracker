import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

interface ErrorHandler extends ErrorRequestHandler {
  message: string;
  code: number | string;
}

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // log error for dev
  // console.log(err);

  if (err.message === "jwt malformed" || err.message === "invalid signature") {
    err.message = "forbeddin.";
    err.code = 403;
  }

  if (err.code == "23505") {
    err.message = "email already exists";
    err.code = 400;
  }

  res.status(parseInt(`${err.code}`) || 500).json({
    code: err.code || 500,
    message: err.message || "server error"
  });
};

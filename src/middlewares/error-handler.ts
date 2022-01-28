import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

interface ErrorHandler extends ErrorRequestHandler {
  message: string;
  code: number;
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

  res.status(err.code || 500).json({
    code: err.code || 500,
    message: err.message || "server error"
  });
};

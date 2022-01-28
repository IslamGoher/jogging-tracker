import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../util/error-response";

const forbiddenError = new ErrorResponse(403, "forbidden");

export function checkRoleForJoggingApi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user.role === "manager")
      return next(forbiddenError);
  
    next();
    
  } catch (error) {
    next(error);
  }
}

export function checkRoleForUserApi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user.role === "user")
      return next(forbiddenError);

    next();
    
  } catch (error) {
    next(error);
  }

}
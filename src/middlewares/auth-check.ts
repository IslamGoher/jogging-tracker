import { Request, Response, NextFunction } from "express";

// middleware function to validate JWT
// and check if user is logged in
export function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // validate cookies

    // validate jwt
    // export the payload
    // add user id to req.user

    next();
    
  } catch (error) {
    next(error);
  }
}
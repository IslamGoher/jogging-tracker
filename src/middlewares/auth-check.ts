import { Request, Response, NextFunction } from "express";
import { parseCookie } from "../util/cookieParser";
import { ErrorResponse } from "../util/error-response";
import jwt from "jsonwebtoken";

// middleware function to validate JWT
// and check if user is logged in
export function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = parseCookie(`${req.headers.cookie}`);
    const unAuthError = new ErrorResponse(
      401,
      "please login to access this content."
    );

    // validate cookies
    if(!cookies.token)
      return next(unAuthError);

    // validate jwt
    const payload: any = jwt.verify(cookies.token, `${process.env.JWT_SECRET}`);
    
    // add user id to req.user
    req.user = {
      id: payload.id,
      role: payload.role
    };

    next();
    
  } catch (error) {
    next(error);
  }
}
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../util/error-response";
import Joi from "joi";

export function validateGetJogging(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    

  } catch (error) {
    next(error);
  }
}
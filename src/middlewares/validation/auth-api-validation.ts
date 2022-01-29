import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../util/error-response";
import Joi from "joi";

export function validateSignup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const joiSchema = Joi.object({
      fullname: Joi.string().min(3).max(200).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(50).required()
    });

    const result = joiSchema.validate(req.body);
    
    if(result.error){
      const errorMessage = result.error.details[0].message;
      return next(new ErrorResponse(400, errorMessage));
    }

    next();
    
  } catch (error) {
    next(error);
  }
}

export function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const joiSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(50).required()
    });

    const result = joiSchema.validate(req.body);

    if (result.error) {
      const errorMessage = result.error.details[0].message;
      return next(new ErrorResponse(400, errorMessage));
    }

    next();

  } catch (error) {
    next(error);
  }
}

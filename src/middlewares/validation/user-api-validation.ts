import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../util/error-response";
import Joi from "joi";

export function validateGetUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const joiSchema = Joi
      .number()
      .min(1)
      .optional()
      .messages({
        "number.min": "page number must be greater than or equal to 1",
        "number.base": "page number must be a number"
      });

    const result = joiSchema.validate(req.query.page);

    if (result.error) {
      const errorMessage = result.error.message;
      return next(new ErrorResponse(400, errorMessage));
    }

    next();

  } catch (error) {
    next(error);
  }
}

export function validateGetOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const joiSchema = Joi
      .number()
      .min(1)
      .messages({
        "number.min": "user id must be greater than or equal to 1",
        "number.base": "user id must be a number"
      });

    const result = joiSchema.validate(req.params.id);

    if (result.error) {
      const errorMessage = result.error.message;
      return next(new ErrorResponse(400, errorMessage));
    }

    next();

  } catch (error) {
    next(error);
  }
}

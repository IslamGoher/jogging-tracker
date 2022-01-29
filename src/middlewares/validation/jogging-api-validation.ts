import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../util/error-response";
import Joi from "joi";

export function validateGetJogging(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const joiSchema = Joi.object({
      from: Joi.date().optional(),
      to: Joi.date().optional(),
      page: Joi.number().min(1).optional()
    });

    const object = {
      from: req.query.from,
      to: req.query.to,
      page: req.query.page
    };

    const result = joiSchema.validate(object);

    if (result.error) {
      const errorMessage = result.error.details[0].message;
      return next(new ErrorResponse(400, errorMessage));
    }

    next();

  } catch (error) {
    next(error);
  }
}
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

export async function validateGetOneJogging(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const joiSchema = Joi.object({
      id: Joi.number().min(1).integer()
    });

    const result = joiSchema.validate({id: req.params.id});

    if (result.error) {
      const errorMessage = result.error.details[0].message;
      return next(new ErrorResponse(400, errorMessage));
    }

    next();

  } catch (error) {
    next(error);
  }
}

export async function validateAddJogging(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const joiSchema = Joi.object({
      date: Joi.date().greater("1990-01-01").required(),
      distance: Joi.number().min(1).required(),
      time: Joi.string()
        // add regular expression validation to validate time as HH:MM:SS
        .pattern(
          new RegExp(/^(?:(?:([01]?\d|2[0-3]):)([0-5]?\d):)([0-5]?\d)$/)
        )
        .required()
        // customize joi error message
        .messages({
          "string.pattern.base": "time is invalid"
        })
    });

    const result = joiSchema.validate(req.body);

    if (result.error) {
      
      const errorMessage = result.error.message;
      return next(new ErrorResponse(400, errorMessage));
    }

    next();
    
  } catch (error) {
    next(error);
  }
}
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../util/error-response";
import Joi from "joi";
import { SchemaObject } from "../../interfaces/user-interfaces";

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

export function validateAddNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let schemaObject: SchemaObject = {
      fullname: Joi.string().min(3).max(200).required()
        .messages({
          "string.base": "fullname must be a string",
          "string.min": "fullname length must be at least 3 characters long",
          "string.max": "fullname length must be less than or equal to 200 characters long",
          "any.required": "fullname is required"
        }),
        
      email: Joi.string().email().required()
        .messages({
          "string.base": "email must be a string",
          "string.email": "email is invalid",
          "any.required": "email is required"
        }),

      password: Joi.string().min(8).max(50).required()
        .messages({
          "string.base": "password must be a string",
          "string.min": "password length must be at least 8 characters long",
          "string.max": "password length must be less than or equal to 50 characters long",
          "any.required": "password is required"
        })
    };

    
    if (req.user.role === "admin")
      schemaObject.role = Joi
        .string()
        .valid("user", "manager", "admin")
        .required()
        .messages({
          "any.only": "role must be one of [user, manager, admin]",
          "any.required": "role is required"
        });
    
    const joiSchema = Joi.object(schemaObject);
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

export function validateUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let schemaObject: SchemaObject = {
      fullname: Joi.string().min(3).max(200).required()
        .messages({
          "string.base": "fullname must be a string",
          "string.min": "fullname length must be at least 3 characters long",
          "string.max": "fullname length must be less than or equal to 200 characters long",
          "any.required": "fullname is required"
        }),
        
      email: Joi.string().email().required()
        .messages({
          "string.base": "email must be a string",
          "string.email": "email is invalid",
          "any.required": "email is required"
        }),

      password: Joi.string().min(8).max(50).required()
        .messages({
          "string.base": "password must be a string",
          "string.min": "password length must be at least 8 characters long",
          "string.max": "password length must be less than or equal to 50 characters long",
          "any.required": "password is required"
        })
    };

    schemaObject.id = Joi
      .number()
      .min(1)
      .messages({
        "number.min": "user id must be greater than or equal to 1",
        "number.base": "user id must be a number"
      });
    
    if (req.user.role === "admin")
      schemaObject.role = Joi
        .string()
        .valid("user", "manager", "admin")
        .required()
        .messages({
          "any.only": "role must be one of [user, manager, admin]",
          "any.required": "role is required"
        });
      
    req.body.id = req.params.id;
    
    const joiSchema = Joi.object(schemaObject);
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

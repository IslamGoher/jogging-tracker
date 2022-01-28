import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pool";
import { signupData } from "../interfaces/auth-interfaces";
import { ErrorResponse } from "../util/error-response";
import { hash } from "bcrypt";
import { signupQueries } from "../database/queries/auth-api-queries";
import { storeTokenToClient } from "../util/store-jwt-to-client";

// @route   POST '/api/v1/signup'
// @desc    Add new user
// @access  public
export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: signupData = req.body;
  
    // check if email already exists
    const response = await pool.query(
      signupQueries.findUserWithEmail,
      [data.email]
    );
  
    if (response.rowCount > 0)
      return next(new ErrorResponse(400, "this email is already exists"));
  
    // encrypt user password
    const SALT_ROUNDS = 10;
    const encryptedPassword = await hash(data.password, SALT_ROUNDS);
  
    // add new user
    const currentUser = await pool.query(
      signupQueries.addNewUser,
      [data.fullname, data.email, encryptedPassword]
    );
    
    // create the payload
    const payload = {
      id: currentUser.rows[0].user_id,
      role: currentUser.rows[0].role
    };

    const MONTH_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

    const cookieOption = {
      httpOnly: true,
      maxAge: Date.now() + MONTH_IN_MILLISECONDS
    };

    // put token into cookies with httpOnly option
    storeTokenToClient(payload, res, cookieOption);
  
    // send response
    res.status(201).json({
      code: 201,
      message: "user successfully registerd"
    });
    
  } catch (error) {
    next(error);
  }
};

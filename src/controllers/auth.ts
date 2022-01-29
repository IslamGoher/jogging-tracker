import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pool";
import { signupData, loginData } from "../interfaces/auth-interfaces";
import { ErrorResponse } from "../util/error-response";
import { hash, compare } from "bcrypt";
import { signupQueries, loginQuery } from "../database/queries/auth-api-queries";
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

    // put token into cookies with httpOnly option
    storeTokenToClient(payload, res);
  
    // send response
    res.status(201).json({
      code: 201,
      message: "user successfully registerd"
    });
    
  } catch (error) {
    next(error);
  }
};


// @route   POST '/api/v1/login'
// @desc    loging into website
// @access  public
export const postlogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: loginData = req.body;

    // find user using email
    const result = await pool.query(loginQuery, [data.email]);

    if (result.rowCount === 0) {
      const errorMessage = "email not found";
      return next(new ErrorResponse(404, errorMessage));
    }

    const encryptedPassword = result.rows[0].password;
    
    // validate password
    const isPasswordValid = await compare(data.password, encryptedPassword);

    if (!isPasswordValid) {
      const errorMessage = "there's an error occured with email or password";
      return next(new ErrorResponse(400, errorMessage));
    }

    const payload = {
      id: result.rows[0].user_id,
      role: result.rows[0].role
    };

    // create jwt
    storeTokenToClient(payload, res);

    // send response
    res.status(200).json({
      code: 200,
      message: "user logged in successfully"
    });

  } catch (error) {
    next(error);
  }
};

// @route   DELETE '/api/v1/logout'
// @desc    loging out website
// @access  private (only logged in user could access)
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // delete token from cookies
    res.clearCookie("token");
    res.status(204).end();

  } catch (error) {
    next(error);
  }
};
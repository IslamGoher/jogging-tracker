import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pool";
import { QueryResult } from "pg";
import { ErrorResponse } from "../util/error-response";
import {
  findUser,
  getOneUserQuery,
  getUsersQueries,
  postUserQuery,
  updateUserQuery
} from "../database/queries/user-api-queries";
import { hash } from "bcrypt";

// @route   GET '/api/v1/users'
// @desc    list all users data
// @access  private (only admins and managers can access users data)
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let usersData: QueryResult;

    // pagination
    const page: string = (req.query.page) ? `${req.query.page}` : "1";
    const LIMIT = 10;
    const offsetNumber = (parseInt(page) * LIMIT) - LIMIT;

    const PAGINATION_QUERY = `
      ORDER BY user_id ASC
      LIMIT ${LIMIT} OFFSET ${offsetNumber};
    `;

    if (req.user.role === "manager")
      usersData = await pool.query(getUsersQueries.manager + PAGINATION_QUERY);

    else
      usersData = await pool.query(getUsersQueries.admin + PAGINATION_QUERY);

    if (usersData.rowCount === 0) {
      const errorMessage = "there's no users founded";
      return next(new ErrorResponse(404, errorMessage));
    }

    res.status(200).json({
      pageNumber: page,
      count: usersData.rowCount,
      data: usersData.rows
    });

  } catch (error) {
    next(error);
  }
};

// @route   GET '/api/v1/users/:id'
// @desc    list one users data
// @access  private (only admins and managers can access users data)
export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const userData = await pool.query(getOneUserQuery, [userId]);

    if (userData.rowCount === 0) {
      const errorMessage = "there's no user found with given id";
      return next(new ErrorResponse(404, errorMessage));
    }

    const currentUser = userData.rows[0];

    if (req.user.role === "manager" && currentUser.role !== "user")
      return next(new ErrorResponse(403, "forbidden"));

    res.status(200).json(currentUser);

  } catch (error) {
    next(error);
  }
};

// @route   POST '/api/v1/users/new'
// @desc    add new users
// @access  private (only admins and managers can access users APIs)
export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const SALT = 10;
    const hashedPassword = await hash(data.password, SALT);

    if (req.user.role === "manager")
      await pool.query(postUserQuery, [
        data.fullname,
        data.email,
        hashedPassword,
        "user"
      ]);
    
    else
      await pool.query(postUserQuery, [
        data.fullname,
        data.email,
        hashedPassword,
        data.role
      ]);

    res.status(201).json({
      code: 201,
      message: "user created successfully"
    });

  } catch (error) {
    next(error);
  }
};

// @route   PUT '/api/v1/users/:id'
// @desc    update user data
// @access  private (only admins and managers can access users APIs)
export const putUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    // find user
    const currentUser = await pool.query(findUser, [userId]);

    // check if not found
    if (currentUser.rowCount === 0) {
      const errorMessage = "there's no user found with given id";
      return next(new ErrorResponse(404, errorMessage));
    }

    const currentUserRole = currentUser.rows[0].role;

    // check role
    if (req.user.role === "manager" && currentUserRole !== "user")
      return next(new ErrorResponse(403, "forbidden"));

    // hash new password
    const SALT = 10;
    const hashedPassword = await hash(data.password, SALT);

    let role = data.role;

    if (req.user.role === "manager")
      role = "user";

    // update user data
    await pool.query(updateUserQuery, [
      data.fullname,
      data.email,
      hashedPassword,
      role,
      userId
    ]);
    
    // send response
    res.status(200).json({
      code: 200,
      message: "user updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

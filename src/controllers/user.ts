import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pool";
import { QueryResult } from "pg";
import { ErrorResponse } from "../util/error-response";
import { getUsersQueries } from "../database/queries/user-api-queries";

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
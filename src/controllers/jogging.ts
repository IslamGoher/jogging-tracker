import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pool";
import { getAllJoggingQuery } from "../database/queries/jogging-api-queries";
import { ErrorResponse } from "../util/error-response";

// @route   GET '/api/v1/jogging'
// @desc    list all jogging data
// @access  private (only authorized user can access jogging)
export const getJogging = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // filtering by date
    const dateFilter = {
      from: (req.query.from) ? req.query.from : "0001-01-01",
      to: (req.query.to) ? req.query.to : "3001-01-01"
    };

    // get all jogging with user id
    const jogging = await pool.query(
      getAllJoggingQuery +
      " AND date > $2 AND date < $3;",
      [req.user.id, dateFilter.from, dateFilter.to]
    );

    if (jogging.rowCount === 0) {
      const errorMessage = "there's no jogging data found";
      return next(new ErrorResponse(404, errorMessage));
    }

    // send response
    res.status(200).json(jogging.rows);

  } catch (error) {
    next(error);
  }
};
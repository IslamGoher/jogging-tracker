import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pool";
import { getAllJoggingQuery } from "../database/queries/jogging-api-queries";

// @route   GET '/api/v1/jogging'
// @desc    list all jogging data
// @access  private (only authorized user can access jogging)
export const getJogging = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get all jogging with user id
    const jogging = await pool.query(getAllJoggingQuery, [req.user.id]);

    // send response
    res.status(200).json(jogging.rows);

  } catch (error) {
    next(error);
  }
};
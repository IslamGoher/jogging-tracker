import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../util/error-response";
import { listJogging } from "../util/get-jogging";

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
      from: (req.query.from) ? `${req.query.from}` : "0001-01-01",
      to: (req.query.to) ? `${req.query.to}` : "3001-01-01"
    };

    // pagination
    const page: string = (req.query.page) ? `${req.query.page}` : "1";
    const LIMIT = 10;
    const offsetNumber = (parseInt(page) * LIMIT) - LIMIT;

    // function to decide for which user jogging will listed
    // and get jogging data from database
    const jogging = await listJogging(req.user, LIMIT, dateFilter, offsetNumber);

    if (jogging.rowCount === 0) {
      const errorMessage = "there's no jogging data found";
      return next(new ErrorResponse(404, errorMessage));
    }

    // send response
    res.status(200).json({
      pageNumber: page,
      count: jogging.rowCount,
      data: jogging.rows
    });

  } catch (error) {
    next(error);
  }
};
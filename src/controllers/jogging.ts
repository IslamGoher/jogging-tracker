import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { pool } from "../database/pool";
import {
  addJoggingQuery,
  getOneJoggingQuery
} from "../database/queries/jogging-api-queries";
import { calculateSpeed } from "../util/calculate-speed";
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

// @route   GET '/api/v1/jogging/:id'
// @desc    get one jogging data by id
// @access  private (only authorized user can access jogging)
export const getOneJogging = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const joggingId = req.params.id;

    let currentJogging: QueryResult;
    
    currentJogging = await pool.query(
      getOneJoggingQuery,
      [joggingId]
    );

    if (currentJogging.rowCount === 0) {
      const errorMessage = "there's no jogging found with given id";
      return next(new ErrorResponse(404, errorMessage));
    }

    const userId = currentJogging.rows[0].user_id;
      
    if (req.user.role === "user" && req.user.id != userId)
      return next(new ErrorResponse(403, "forbidden"));

    const joggingData = currentJogging.rows[0];
    res.status(200).json(joggingData);

  } catch (error) {
    next(error);
  }
};

// @route   GET '/api/v1/jogging/new'
// @desc    add new jogging data
// @access  private (only authorized user can access jogging)
export const postJogging = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    // calculate speed
    // speed in km/hour
    const speed = calculateSpeed(data.time, data.distance);

    // add data to database
    await pool.query(addJoggingQuery, [
      data.date,
      data.distance,
      data.time,
      speed,
      userId
    ]);

    // send response
    res.status(201).json({
      code: 201,
      message: "jogging added successfully"
    });

  } catch (error) {
    next(error);
  }
};

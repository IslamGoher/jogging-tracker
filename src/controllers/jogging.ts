import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { pool } from "../database/pool";
import {
  addJoggingQuery,
  deleteJoggingQuery,
  getOneJoggingQuery,
  findJoggingQuery,
  updateJoggingQuery,
  joggingReportquery
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

// @route   POST '/api/v1/jogging/new'
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

// @route   PUT '/api/v1/jogging/:id'
// @desc    update jogging data
// @access  private (only authorized user can access jogging)
export const putJogging = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const joggingId = req.params.id;

    // find jogging data
    const currentJogging = await pool.query(
      findJoggingQuery,
      [joggingId]
    );

    if (currentJogging.rowCount === 0) {
      const errorMessage = "there's no jogging founded with given id";
      return next(new ErrorResponse(404, errorMessage));
    }

    const userId = currentJogging.rows[0].user_id;

    // check user authorization
    if (req.user.role === "user" && req.user.id != userId)
      return next(new ErrorResponse(403, "forbidden"));

    // calculate new speed
    const newSpeed = calculateSpeed(data.time, data.distance);

    // update data
    await pool.query(updateJoggingQuery, [
      data.date,
      data.distance,
      data.time,
      newSpeed,
      joggingId,
    ]);

    // send response
    res.status(200).json({
      code: 200,
      message: "jogging updated successfully"
    });
    
  } catch (error) {
    next(error);
  }
};

// @route   DELETE '/api/v1/jogging/:id'
// @desc    delete jogging data by id
// @access  private (only authorized user can access jogging)
export const deleteJogging = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const joggingId = req.params.id;

    // find jogging data
    const currentJogging = await pool.query(
      findJoggingQuery,
      [joggingId]
    );

    if (currentJogging.rowCount === 0) {
      const errorMessage = "there's no jogging founded with given id";
      return next(new ErrorResponse(404, errorMessage));
    }

    const userId = currentJogging.rows[0].user_id;

    // check user authorization
    if (req.user.role === "user" && req.user.id != userId)
      return next(new ErrorResponse(403, "forbidden"));

    // delete jogging
    await pool.query(deleteJoggingQuery, [joggingId]);

    // send response
    res.status(200).json({
      code: 200,
      message: "jogging deleted successfully"
    });
    
  } catch (error) {
    next(error);
  }
};

// @route   GET '/api/v1/report/jogging'
// @desc    get report on average speed and distance per week
// @access  private (only authorized user can access jogging)
export const getJoggingReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;

    const report = await pool.query(joggingReportquery, [userId]);

    // check if there's no data
    if (report.rowCount === 0) {
      const errorMessage = "can't generate the report this week, since no jogging data recorded";
      return next(new ErrorResponse(404, errorMessage));
    }

    // fix 2 numbers after the decimal point
    const averageSpeed = report.rows[0].average_speed;
    const averageDistance = report.rows[0].average_distance;
    const resData = {
      averageSpeed: parseFloat(averageSpeed).toFixed(2),
      averageDistance: parseFloat(averageDistance).toFixed(2)
    };

    res.status(200).json(resData);
    
  } catch (error) {
    next(error);
  }
};

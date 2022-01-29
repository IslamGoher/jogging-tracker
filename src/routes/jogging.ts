import express, { Router } from "express";
import { getJogging } from "../controllers/jogging";

export const router: Router = express.Router();

// @route   GET '/api/v1/jogging'
// @desc    list all jogging data
// @access  private (only authorized user can access jogging)
router.get("/jogging", getJogging);
import express, { Router } from "express";
import { getJogging, getOneJogging, postJogging } from "../controllers/jogging";
import { checkRoleForJoggingApi } from "../middlewares/auth-role-check";
import {
  validateAddJogging,
  validateGetJogging,
  validateGetOneJogging,
} from "../middlewares/validation/jogging-api-validation";

export const router: Router = express.Router();

// @route   GET '/api/v1/jogging'
// @desc    list all jogging data
// @access  private (only authorized user can access jogging)
router.get("/jogging", checkRoleForJoggingApi, validateGetJogging, getJogging);

// @route   GET '/api/v1/jogging/:id'
// @desc    get one jogging data by id
// @access  private (only authorized user can access jogging)
router.get(
  "/jogging/:id",
  checkRoleForJoggingApi,
  validateGetOneJogging,
  getOneJogging
);

// @route   GET '/api/v1/jogging/new'
// @desc    add new jogging data
// @access  private (only authorized user can access jogging)
router.post(
  "/jogging/new",
  checkRoleForJoggingApi,
  validateAddJogging,
  postJogging
);

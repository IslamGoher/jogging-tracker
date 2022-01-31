import express, { Router } from "express";
import {
  deleteJogging,
  getJogging,
  getJoggingReport,
  getOneJogging,
  postJogging,
  putJogging
} from "../controllers/jogging";
import { checkRoleForJoggingApi } from "../middlewares/auth-role-check";
import {
  validateAddJogging,
  validateDeleteJogging,
  validateGetJogging,
  validateGetOneJogging,
  validateUpdateJogging,
} from "../middlewares/validation/jogging-api-validation";

export const router: Router = express.Router();

// @route   GET '/api/v1/jogging'
// @desc    list all jogging data
// @access  private (only authorized user can access jogging)
router.get("/jogging", checkRoleForJoggingApi, validateGetJogging, getJogging);

// @routes  GET '/api/v1/jogging/:id'
// @desc    get one jogging data by id

// @routes  PUT '/api/v1/jogging/:id'
// @desc    update jogging data by id

// @routes  DELETE '/api/v1/jogging/:id'
// @desc    delete jogging data by id

// @access  private (only authorized user can access jogging)
router.route("/jogging/:id")
  .get(checkRoleForJoggingApi, validateGetOneJogging, getOneJogging)
  .put(checkRoleForJoggingApi, validateUpdateJogging, putJogging)
  .delete(checkRoleForJoggingApi, validateDeleteJogging, deleteJogging);

// @route   POST '/api/v1/jogging/new'
// @desc    add new jogging data
// @access  private (only authorized user can access jogging)
router.post(
  "/jogging/new",
  checkRoleForJoggingApi,
  validateAddJogging,
  postJogging
);

// @route   GET '/api/v1/report/jogging'
// @desc    get report on average speed and distance per week
// @access  private (only authorized user can access jogging)
router.get("/report/jogging", checkRoleForJoggingApi, getJoggingReport);
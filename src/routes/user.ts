import express, { Router } from "express";
import { getOneUser, getUsers } from "../controllers/user";
import { checkRoleForUserApi } from "../middlewares/auth-role-check";
import {
  validateGetOneUser,
  validateGetUsers,
} from "../middlewares/validation/user-api-validation";

export const router: Router = express.Router();

// @route   GET '/api/v1/users'
// @desc    list all users data
// @access  private (only admins and managers can access users data)
router.get("/users", checkRoleForUserApi, validateGetUsers, getUsers);

// @route   GET '/api/v1/users/:id'
// @desc    list one users data
// @access  private (only admins and managers can access users data)
router.get("/users/:id", checkRoleForUserApi, validateGetOneUser, getOneUser);

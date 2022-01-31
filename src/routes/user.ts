import express, { Router } from "express";
import { getUsers } from "../controllers/user";
import { checkRoleForUserApi } from "../middlewares/auth-role-check";
import { validateGetUsers } from "../middlewares/validation/user-api-validation";

export const router: Router = express.Router();

// @route   GET '/api/v1/users'
// @desc    list all users data
// @access  private (only admins and managers can access users data)
router.get("/users", checkRoleForUserApi, validateGetUsers, getUsers);

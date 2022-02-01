import express, { Router } from "express";
import {
  deleteUser,
  getOneUser,
  getUsers,
  postUser,
  putUser,
} from "../controllers/user";
import { checkRoleForUserApi } from "../middlewares/auth-role-check";
import {
  validateAddNewUser,
  validateGetDeleteUser,
  validateGetUsers,
  validateUpdateUser,
} from "../middlewares/validation/user-api-validation";

export const router: Router = express.Router();

// @route   GET '/api/v1/users'
// @desc    list all users data
// @access  private (only admins and managers can access users data)
router.get("/users", checkRoleForUserApi, validateGetUsers, getUsers);

// @route   GET '/api/v1/users/:id'
// @desc    list one user data

// @route   PUT '/api/v1/users/:id'
// @desc    update user data

// @route   DELETE '/api/v1/users/:id'
// @desc    delete user data

// @access  private (only admins and managers can access users data)
router.route("/users/:id")
  .get(checkRoleForUserApi, validateGetDeleteUser, getOneUser)
  .put(checkRoleForUserApi, validateUpdateUser, putUser)
  .delete(checkRoleForUserApi, validateGetDeleteUser, deleteUser);

// @route   POST '/api/v1/users/new'
// @desc    add new users
// @access  private (only admins and managers can access users APIs)
router.post("/users/new", checkRoleForUserApi, validateAddNewUser, postUser);

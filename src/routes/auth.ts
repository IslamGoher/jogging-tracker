import express, { Router } from "express";
import { postSignup, postlogin, logout } from "../controllers/auth";
import {
  validateSignup,
  validateLogin,
} from "../middlewares/validation/auth-api-validation";
import { checkAuth } from "../middlewares/auth-check";

export const router: Router = express.Router();

// @route   POST '/api/v1/signup'
// @desc    Add new user
// @access  public
router.post("/signup", validateSignup, postSignup);

// @route   POST '/api/v1/login'
// @desc    loging into website
// @access  public
router.post("/login", validateLogin, postlogin);

// @route   DELETE '/api/v1/logout'
// @desc    loging out website
// @access  private (only logged in user could access)
router.delete("/logout", checkAuth, logout);

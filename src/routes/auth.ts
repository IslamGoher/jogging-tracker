import express, { Router } from "express";
import { postSignup, postlogin } from "../controllers/auth";
import {
  validateSignup,
  validateLogin,
} from "../middlewares/validation/auth-api-validation";

export const router: Router = express.Router();

// @route   POST '/api/v1/signup'
// @desc    Add new user
// @access  public
router.post("/signup", validateSignup, postSignup);

// @route   POST '/api/v1/login'
// @desc    loging into website
// @access  public
router.post("/login", validateLogin, postlogin);

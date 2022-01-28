import express, { Router } from "express";
import { postSignup } from "../controllers/auth";
import { validateSignup } from "../middlewares/validation/auth-api-validation";

export const router: Router = express.Router();

// @route   POST '/api/v1/signup'
// @desc    Add new user
// @access  public
router.post("/signup",validateSignup, postSignup);
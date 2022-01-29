import { Response } from "express";
import { sign, JwtPayload } from "jsonwebtoken";

export function storeTokenToClient(payload: JwtPayload, res: Response) {

  const MONTH_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

  const cookieOption = {
    httpOnly: true,
    maxAge: Date.now() + MONTH_IN_MILLISECONDS
  };

  // create JWT
  const token = sign(payload, `${process.env.JWT_SECRET}`);

  res.cookie("token", token, cookieOption);
}
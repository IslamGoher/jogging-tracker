import { Response } from "express";
import { sign, JwtPayload } from "jsonwebtoken";

export function storeTokenToClient(payload: JwtPayload, res: Response, cookieOption: object) {
  // create JWT
  const token = sign(payload, `${process.env.JWT_SECRET}`);

  res.cookie("token", token, cookieOption);
}
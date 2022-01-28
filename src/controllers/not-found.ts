import { Request, Response } from "express";

// @route   any
// @desc    send not found response to unhandled urls
// @access  public
export const getNotFound = (req: Request, res: Response) => {
  res.status(404).json({
    code: 404,
    message: "this url not found"
  });
};

import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.listen(app, () => {
  // eslint-disable-next-line no-console
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});

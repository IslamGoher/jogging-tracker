import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

const app: Application = express();
const port = process.env.PORT || 3000;

// using morgan only in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});

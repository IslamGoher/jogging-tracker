import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import * as swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";
import { createDB } from "./queries/create-db";
import { createTables } from "./queries/create-tables";
import { errorHandler } from "./middlewares/error-handler";

const app: Application = express();
const port = process.env.PORT || 3000;

(async function () {
  // create database
  await createDB();

  // create tables
  await createTables();
})();

// using morgan only in development mode
if (process.env.NODE_ENV === "development") {
  // use swagger
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(morgan("dev", {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    skip: (req, res) => {
      return req.url.startsWith("/docs/");
    }
  }));
}

// use error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});

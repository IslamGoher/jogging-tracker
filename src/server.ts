import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import * as swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";
import { createDB } from "./database/queries/create-db";
import { createTables } from "./database/queries/create-tables";
import { errorHandler } from "./middlewares/error-handler";
import { checkAuth } from "./middlewares/auth-check";
import { getNotFound } from "./controllers/not-found";
import { router as authRouter } from "./routes/auth";
import { router as joggingRouter } from "./routes/jogging";

const app: Application = express();
const port = process.env.PORT || 3000;

(async function () {
  // create database
  await createDB();

  // create tables
  await createTables();
})();

app.use(express.json());

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

// authentication routes
app.use("/api/v1", authRouter);

// check user authorization
app.use(checkAuth);

// jogging routes
app.use("/api/v1", joggingRouter);

// not found middleware
app.use(getNotFound);

// use error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});

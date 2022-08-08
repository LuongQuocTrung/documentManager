import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connection } from "./src/config/configConnection.js";
import cors from "cors";
import dotenv from "dotenv";
import errorHandle from "./src/middleware/errorHandle.js";
import router from "./src/routes/index.js";
dotenv.config();
connection();

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(router);
// handle fail request
app.all("*", (req, res, next) => {
  const error = new Error("The route can not found");
  error.statusCode = 404;
  next(error);
});
app.use(errorHandle);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

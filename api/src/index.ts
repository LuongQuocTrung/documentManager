import * as dotenv from "dotenv";
import { Express } from "express";
import express from "express";
import { AppDataSource, connectionPostgres } from "./config/data-source";
import errorHandle from "./middleware/errorHandle";
import morgan from "morgan";
import router from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerDocs from "./config/swagger";
async function main() {
  const app: Express = express();

  swaggerDocs(app);

  dotenv.config();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(cors());

  await connectionPostgres();

  router(app);
  app.use(errorHandle);
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
  });
}
main();

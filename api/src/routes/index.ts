import * as express from "express";
import commonRouter from "./common-route";
import staffRouter from "./staff-router";
import { Request, Response, NextFunction, Express } from "express";

import AppError from "../utils/appError";

const routes = (app: Express) => {
  app.use("/", commonRouter);
  app.use("/staff", staffRouter);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const error = new AppError(404, "The route not found");
    return next(error);
  });
};

export default routes;

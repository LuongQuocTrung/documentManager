import * as express from "express";
import commonRouter from "./commonRoute";
import staffRouter from "./staffRouter";
import departmentRouter from "./departmentRouter";
import companyRouter from "./companyRouter";
import drawerRouter from "./drawerRouter";
import documentRouter from "./documentRouter";
import cabinetRouter from "./cabinet";
import inventoryRouter from "./inventory";
import { Request, Response, NextFunction, Express } from "express";

import AppError from "../utils/appError";

const routes = (app: Express) => {
  app.use("/", commonRouter);
  app.use("/staff", staffRouter);
  app.use("/department", departmentRouter);
  app.use("/company", companyRouter);
  app.use("/drawer", drawerRouter);
  app.use("/document", documentRouter);
  app.use("/inventory", inventoryRouter);
  app.use("/cabinet", cabinetRouter);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const error = new AppError(404, "The route not found");
    return next(error);
  });
};

export default routes;

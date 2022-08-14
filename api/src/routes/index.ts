import * as express from "express";
import commonRouter from "./commonRoute";
import staffRouter from "./staffRouter";
import departmentRouter from "./departmentRouter";
import companyRouter from "./companyRouter";
import drawerRouter from "./drawerRouter";
import documentRouter from "./documentRouter";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const router = express.Router();
router.use("/", commonRouter);
router.use("/staff", staffRouter);
router.use("/department", departmentRouter);
router.use("/company", companyRouter);
router.use("/drawer", drawerRouter);
router.use("/document", documentRouter);
router.all("*", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const error = new AppError(404, "The route not found");
  return next(error);
});
export default router;

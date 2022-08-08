import express from "express";
import accountRouter from "./AccountRouter.js";
import cabinetRouter from "./CabinetRouter.js";
import companyRouter from "./CompanyRouter.js";
import drawerRouter from "./DrawerRouter.js";
import inventoryRouter from "./InventoryRouter.js";
import staffRouter from "./StaffRouter.js";
import departmentRouter from "./DepartmentRouter.js";
const router = express.Router();
//localhost:5000/staff/
router.use("/", accountRouter);
router.use("/staff", staffRouter);
router.use("/company", companyRouter);
router.use("/inventory", inventoryRouter);
router.use("/department", departmentRouter);
router.use("/cabinet", cabinetRouter);
router.use("/drawer", drawerRouter);
router.all("*", (req, res, next) => {
  return next();
});
export default router;

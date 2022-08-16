import * as express from "express";
import departmentController from "../controllers/department";
import { auth } from "../middleware/auth";
import * as validate from "./validate/department";
/**
 * @openapi
 * tags:
 *  name: Department
 */
const router = express.Router();
router.use(auth);
router.get("/", validate.queryDepartment, departmentController.getDepartments);
/**
 * @openapi
 * /department:
 *   get:
 *     summary: Get departments
 *     tags: [Department]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: companyId
 *         description: availble (storage,management)
 *         schema:
 *            type: string
 *       - in: query
 *         name: active
 *         schema:
 *            type: boolean
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                     type: array
 *                     items:
 *                      properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       active:
 *                         type: string
 *                       company:
 *                         type: object
 *                         properties:
 *                            id:
 *                              type: string
 *                            name:
 *                              type: string
 *                            address:
 *                              type: string
 *                            active:
 *                              type: boolean
 *                            typeCompany:
 *                              type: string
 */
router.get("/:id", validate.isUUID, departmentController.getDepartmentById);
/**
 * @openapi
 * /department/{id}:
 *   get:
 *     summary: Get department
 *     tags: [Department]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       active:
 *                         type: string
 *                       company:
 *                         type: object
 *                         properties:
 *                            id:
 *                              type: string
 *                            name:
 *                              type: string
 *                            address:
 *                              type: string
 *                            active:
 *                              type: boolean
 *                            typeCompany:
 *                              type: string
 */
router.post(
  "/",
  validate.createDepartment,
  departmentController.createDepartment
);
/**
 * @openapi
 * /department:
 *   post:
 *     summary: create department
 *     tags: [Department]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               companyId:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                    type: object
 *                    properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       isRoot:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       departmentId:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           active:
 *                             type: boolean
 */
router.put(
  "/:id",
  validate.isUUID,
  validate.createDepartment,
  departmentController.updateDepartment
);
/**
 * @openapi
 * /department/{id}:
 *   put:
 *     summary: update department
 *     tags: [Department]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               companyId:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                    type: object
 *                    properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       isRoot:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       company:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           active:
 *                             type: boolean
 */
router.patch(
  "/:id/active",
  validate.isUUID,
  departmentController.changeActiveDepartment
);
/**
 * @openapi
 * /department/{id}/active:
 *   patch:
 *     summary: change status department
 *     tags: [Department]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                    type: object
 *                    properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       isRoot:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       departmentId:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           active:
 *                             type: boolean
 */
export default router;

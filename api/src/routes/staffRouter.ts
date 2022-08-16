import * as express from "express";
import staffController from "../controllers/staff";
import { auth } from "../middleware/auth";
import * as validate from "./validate/staff";
const router = express.Router();
router.use(auth);
/**
 * @openapi
 * tags:
 *  name: Staff
 */
router.get("/:id", validate.isUUID, staffController.getStaffById);
/**
 * @openapi
 * /staff/{id}:
 *   get:
 *     summary: Get staff
 *     tags: [Staff]
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
 *                       phone:
 *                         type: string
 *                       isRoot:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       department:
 *                         type: object
 *                         properties:
 *                            id:
 *                               type: string
 *                            name:
 *                               type: string
 *                            active:
 *                                type: boolean
 */
router.get("/", validate.queryStaff, staffController.getStaffs);
/**
 * @openapi
 * /staff:
 *   get:
 *     summary: Get staff list
 *     tags: [Staff]
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
 *         name: departmentId
 *         schema:
 *           type: string
 *       - in: query
 *         name: active
 *         description: available value (true, false)
 *         schema:
 *            type: string
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
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
 *                       department:
 *                         type: object
 *                         properties:
 *                            id:
 *                               type: string
 *                            name:
 *                               type: string
 *                            active:
 *                                type: boolean
 */
router.post("/", validate.createStaff, staffController.createStaff);
/**
 * @openapi
 * /staff:
 *   post:
 *     summary: create staff
 *     tags: [Staff]
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
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               departmentId:
 *                 type: string
 *               active:
 *                 type: boolean
 *               isRoot:
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
  validate.createStaff,
  staffController.updateStaff
);
/**
 * @openapi
 * /staff/{id}:
 *   put:
 *     summary: update staff
 *     tags: [Staff]
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
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               departmentId:
 *                 type: string
 *               active:
 *                 type: boolean
 *               isRoot:
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
router.patch("/:id/active", validate.isUUID, staffController.changeActiveStaff);
/**
 * @openapi
 * /staff/{id}/active:
 *   patch:
 *     summary: update staff
 *     tags: [Staff]
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

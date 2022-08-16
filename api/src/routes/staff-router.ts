import * as express from "express";
import controllers from "../controllers";
import { auth } from "../middlewares/auth";
import { isRoot } from "./permission/requireRoot";
import * as validate from "./validation/staff";
const router = express.Router();
router.use(auth);
/**
 * @openapi
 * tags:
 *  name: Staff
 */
router.get("/:id", validate.isUUID, controllers.staff.findById);
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
 */
router.get("/", validate.queryStaff, controllers.staff.find);
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
 */
router.post("/", validate.createStaff, isRoot, controllers.staff.create);
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
 */
router.put(
  "/:id",
  validate.isUUID,
  validate.createStaff,
  isRoot,
  controllers.staff.update
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
 */
router.patch(
  "/:id/active",
  validate.isUUID,
  isRoot,
  controllers.staff.changeActive
);
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
 */
export default router;

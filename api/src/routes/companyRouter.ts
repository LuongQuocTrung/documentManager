import * as express from "express";
import companyController from "../controllers/company";
import { auth } from "../middleware/auth";
import * as validate from "./validate/company";
const router = express.Router();
router.use(auth);
/**
 * @openapi
 * tags:
 *  name: Company
 */
router.get("/", validate.queryCompany, companyController.getCompanies);
/**
 * @openapi
 * /company:
 *   get:
 *     summary: Get companies
 *     tags: [Company]
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
 *         name: typeCompany
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
 *                        id:
 *                          type: string
 *                        name:
 *                          type: string
 *                        address:
 *                          type: string
 *                        active:
 *                          type: boolean
 *                        typeCompany:
 *                          type: string
 */
router.get("/:id", validate.isUUID, companyController.getCompanyById);
/**
 * @openapi
 * /company/{id}:
 *   get:
 *     summary: Get company
 *     tags: [Company]
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
 *                        id:
 *                          type: string
 *                        name:
 *                          type: string
 *                        address:
 *                          type: string
 *                        active:
 *                          type: boolean
 *                        typeCompany:
 *                          type: string
 */
router.post("/", validate.createCompany, companyController.createCompany);
/**
 * @openapi
 * /company:
 *   post:
 *     summary: create company
 *     tags: [Company]
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
 *               address:
 *                 type: string
 *               active:
 *                 type: boolean
 *               typeCompany:
 *                 type: string
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
 *                      id:
 *                        type: string
 *                      name:
 *                        type: string
 *                      address:
 *                        type: string
 *                      active:
 *                        type: boolean
 *                      typeCompany:
 *                        type: string
 */
router.put(
  "/:id",
  validate.isUUID,
  validate.createCompany,
  companyController.updateCompany
);
/**
 * @openapi
 * /company/{id}:
 *   put:
 *     summary: update company
 *     tags: [Company]
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
 *               address:
 *                 type: string
 *               active:
 *                 type: boolean
 *               typeCompany:
 *                 type: string
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
 *                      id:
 *                        type: string
 *                      name:
 *                        type: string
 *                      address:
 *                        type: string
 *                      active:
 *                        type: boolean
 *                      typeCompany:
 *                        type: string
 */
router.patch(
  "/:id/active",
  validate.isUUID,
  companyController.changeActiveCompany
);
/**
 * @openapi
 * /company/{id}/active:
 *   patch:
 *     summary: update company
 *     tags: [Company]
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
 *                      id:
 *                        type: string
 *                      name:
 *                        type: string
 *                      address:
 *                        type: string
 *                      active:
 *                        type: boolean
 *                      typeCompany:
 *                        type: string
 */
export default router;

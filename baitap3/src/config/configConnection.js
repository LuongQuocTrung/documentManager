import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import Status from "../models/Status.js";
import Company from "../models/Company.js";
import Department from "../models/Department.js";
import Inventory from "../models/Inventory.js";
import Staff from "../models/Staff.js";
import Document from "../models/Document.js";
import Cabinet from "../models/Cabinet.js";
import Drawer from "../models/Drawer.js";
import Type from "../models/Type.js";
dotenv.config();
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Status,
    Company,
    Department,
    Inventory,
    Cabinet,
    Staff,
    Drawer,
    Document,
    Type,
  ],
  synchronize: true,
  logging: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
async function connection() {
  try {
    await AppDataSource.initialize();
    console.log("connect successfully");
  } catch (e) {
    console.log("connect to database error:" + e.message);
  }
}
export { connection };
export default AppDataSource;

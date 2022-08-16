import { AppDataSource } from "../config/data-source";
import { Cabinet } from "../entitys";
import { ICreateCabinet } from "../models/createRequest";
import { IQueryCabinet } from "../models/queryRequest";
import { Brackets } from "typeorm";
import inventoryDAO from "./inventory";

const cabinetRes = AppDataSource.getRepository(Cabinet);
export default class cabinetDAO {
  static findCabinetById = async (id: string): Promise<Cabinet | null> => {
    const rs = await cabinetRes.findOne({
      where: { id: id },
      relations: { inventory: true },
    });
    if (!rs) {
      return null;
    }
    return rs;
  };
  static findCabinets = async (query: IQueryCabinet): Promise<Cabinet[]> => {
    const limit = query.limit ? Math.floor(query.limit) : 20;
    const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
    const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
    const queryString = await cabinetRes
      .createQueryBuilder()
      .innerJoinAndSelect("Cabinet.inventory", "Inventory")
      .where("Cabinet.name Like :name", { name: keyword });
    if (query.inventoryId && query.inventoryId != "all") {
      await queryString.andWhere("Inventory.id = :id", {
        id: query.inventoryId,
      });
    }
    return await queryString.limit(limit).offset(skip).getMany();
  };
  static createCabinet = async (
    cabinet: ICreateCabinet
  ): Promise<Cabinet | null> => {
    const inventory = await inventoryDAO.findInventoryById(cabinet.inventoryId);
    if (!inventory) {
      return null;
    }
    const createCabinet = await cabinetRes.save(
      cabinetRes.create({ ...cabinet, inventory })
    );
    return createCabinet;
  };
  static saveCabinet = async (
    cabinet: ICreateCabinet,
    id: string
  ): Promise<Cabinet | null> => {
    const oldCabinet = await cabinetRes.findOneBy({ id });
    const inventory = await inventoryDAO.findInventoryById(cabinet.inventoryId);
    if (!oldCabinet || !inventory) {
      return null;
    }
    const updateCabinet = await cabinetRes.save(
      Object.assign(oldCabinet, { ...cabinet, inventory: inventory })
    );
    return updateCabinet;
  };
}

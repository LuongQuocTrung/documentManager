import { Inventory } from "../entitys";
import { AppDataSource } from "../config/data-source";
import { IcreateIventory } from "../models/createRequest";
import CompanyDAO from "./company";
import { IQueryInventory } from "../models/queryRequest";

const inventoryRes = AppDataSource.getRepository(Inventory);

export default class inventoryDAO {
  static findInventoryById = async (id: string): Promise<Inventory | null> => {
    const rs = await inventoryRes.findOne({
      where: { id: id },
      relations: { company: true },
    });
    if (!rs) {
      return null;
    }
    return rs;
  };
  static findInventories = async (
    query: IQueryInventory
  ): Promise<Inventory[]> => {
    const limit = query.limit ? Math.floor(query.limit) : 20;
    const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
    const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
    const queryString = await inventoryRes
      .createQueryBuilder()
      .innerJoinAndSelect("Inventory.company", "Company")
      .where("Inventory.name Like :name", { name: keyword });
    if (query.companyId && query.companyId != "all") {
      await queryString.andWhere("Company.id = :id", { id: query.companyId });
    }
    return await queryString.limit(limit).offset(skip).getMany();
  };
  static createInventory = async (
    inventory: IcreateIventory
  ): Promise<Inventory | null> => {
    const company = await CompanyDAO.findCompanyById(inventory.companyId);
    if (!company) {
      return null;
    }
    const createInventory = await inventoryRes.save(
      inventoryRes.create({ ...inventory, company })
    );
    return createInventory;
  };
  static saveInventory = async (
    inventory: IcreateIventory,
    id: string
  ): Promise<Inventory | null> => {
    const oldInventory = await inventoryRes.findOneBy({ id });
    const company = await CompanyDAO.findCompanyById(inventory.companyId);
    if (!oldInventory || !company) {
      return null;
    }
    const updateInventory = await inventoryRes.save(
      Object.assign(oldInventory, { ...inventory, company: company })
    );
    return updateInventory;
  };
}

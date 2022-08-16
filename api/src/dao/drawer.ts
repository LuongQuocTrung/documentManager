import { Drawer } from "../entitys";
import { AppDataSource } from "../config/data-source";
import { ICreateDrawer } from "../models/createRequest";
import cabinetDAO from "./cabinet";
import { IQueryDrawer } from "../models/queryRequest";

const drawerRes = AppDataSource.getRepository(Drawer);

export default class drawerDAO {
  static findDrawerById = async (id: string): Promise<Drawer | null> => {
    const rs = await drawerRes.findOne({
      where: { id: id },
      relations: { cabinet: true },
    });
    if (!rs) {
      return null;
    }
    return rs;
  };
  static findDrawers = async (query: IQueryDrawer): Promise<Drawer[]> => {
    const limit = query.limit ? Math.floor(query.limit) : 20;
    const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
    const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
    console.log(limit, keyword, skip);
    const queryString = await Drawer.createQueryBuilder("Drawer")
      .innerJoinAndSelect("Drawer.cabinet", "Cabinet")
      .innerJoin("Cabinet.inventory", "Inventory")
      .innerJoin("Inventory.company", "Company")
      .where("Drawer.name Like :name", { name: keyword });
    if (
      query.typeCompany &&
      (query.typeCompany == "management" || query.typeCompany == "storage")
    ) {
      console.log(query.typeCompany);
      await queryString.andWhere("Company.typeCompany = :type", {
        type: query.typeCompany,
      });
    }
    if (query.cabinetId && query.cabinetId != "all") {
      await queryString.andWhere("Cabinet.id = :id", { id: query.cabinetId });
    }
    if (query.active) {
      await queryString.andWhere("Drawer.active = :active", {
        active: query.active,
      });
    }
    return await queryString.limit(limit).offset(skip).getMany();
  };
  static createDrawer = async (
    drawer: ICreateDrawer
  ): Promise<Drawer | null> => {
    const cabinet = await cabinetDAO.findCabinetById(drawer.cabinetId);
    if (!cabinet) {
      return null;
    }
    console.log(drawer);
    const createDrawer = await drawerRes.save(
      drawerRes.create({ ...drawer, cabinet })
    );
    console.log(createDrawer);
    await createDrawer.reload();
    return createDrawer;
  };
  static saveDrawer = async (
    drawer: ICreateDrawer,
    id: string
  ): Promise<Drawer | null> => {
    const oldDrawer = await drawerRes.findOneBy({ id });
    const cabinet = await cabinetDAO.findCabinetById(drawer.cabinetId);
    if (!oldDrawer || !cabinet) {
      return null;
    }
    const updateDrawer = await drawerRes.save(
      Object.assign(oldDrawer, { ...drawer, cabinet })
    );
    return updateDrawer;
  };
  static changeActive = async (id: string): Promise<Drawer | null> => {
    const oldDrawer = await this.findDrawerById(id);
    if (!oldDrawer) {
      return null;
    }
    const updateDrawer = await drawerRes.update(id, {
      active: !oldDrawer.active,
    });
    if (!updateDrawer.affected) {
      return null;
    }
    await oldDrawer.reload();
    return oldDrawer;
  };
  static isManagementCompany = async (id: string): Promise<Boolean> => {
    const drawer = await drawerRes
      .createQueryBuilder("Drawer")
      .innerJoinAndSelect("Drawer.cabinet", "Cabinet")
      .innerJoinAndSelect("Cabinet.inventory", "Inventory")
      .innerJoinAndSelect("Inventory.company", "Company")
      .where("Drawer.id = :id", { id })
      .getOne();
    return drawer?.cabinet.inventory.company.typeCompany == "management";
  };
}

import { Staff } from "../entitys";

// create interafce
export interface ICreateStaff {
  name: string;
  phone: string;
  password: string;
  isRoot: boolean;
  active: boolean;
  departmentId: string;
  auth: Staff;
}
export interface ICreateCompany {
  name: string;
  address: string;
  active: boolean;
  auth: Staff;
}
export interface ICreateDepartment {
  name: string;
  active: boolean;
  companyId: string;
  auth: Staff;
}
export interface IcreateIventory {
  name: string;
  companyId: string;
  auth: Staff;
}
export interface ICreateCabinet {
  name: string;
  inventoryId: string;
  auth: Staff;
}
export interface ICreateDrawer {
  name: string;
  active: boolean;
  cabinetId: string;
  auth: Staff;
}
export interface ICreateDocument {
  title: string;
  description: string;
  staffId: string;
  drawerId: string;
  auth: Staff;
}

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
// search params interface
export interface IQueryCompany {
  limit: number;
  page: number;
  keyword: string;
  active: boolean;
  typeCompany: string;
  auth: Staff;
}
export interface IQueryStaff {
  limit: number;
  page: number;
  keyword: string;
  active: boolean;
  departmentId: string;
  auth: Staff;
}
export interface IQueryDepartment {
  limit: number;
  page: number;
  keyword: string;
  companyId: string;
  active: string;
}
export interface IQueryInventory {
  limit: number;
  page: number;
  keyword: string;
  companyId: string;
}
export interface IQueryCabinet {
  limit: number;
  page: number;
  keyword: string;
  inventoryId: string;
}
export interface IQueryDrawer {
  limit: number;
  page: number;
  keyword: string;
  cabinetId: string;
  typeCompany: string;
  active: boolean;
}
export interface IQueryDocument {
  limit: number;
  page: number;
  keyword: string;
  status: string | null;
  drawerId: string | null;
  createdAt: Date | string;
}
// others
export interface ILogin {
  phone: string;
  password: string;
}
export interface IActionResponse {
  data: Object;
  message: string;
}
export interface IStorageDeliveryDoc {
  id: string;
  drawerId: string;
}

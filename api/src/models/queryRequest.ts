import { Staff } from "../entitys";

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

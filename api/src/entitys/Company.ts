import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import BaseModel from "./Base";
import Department from "./Department";
import Inventory from "./Inventory";
@Entity("Company")
export default class extends BaseModel {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  active?: boolean;

  @Column({ default: "management" })
  typeCompany: string;

  @OneToMany(() => Department, (department) => department.company)
  departments: Department[];

  @OneToMany(() => Inventory, (inventory) => inventory.company)
  inventories: Inventory[];
}

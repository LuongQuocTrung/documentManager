import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseModel from "./Base";
import Cabinet from "./Cabinet";
import Company from "./Company";

@Entity("Inventory")
export default class Inventory extends BaseModel {
  @Column()
  name: string;

  @ManyToOne(() => Company, (company) => company.inventories)
  @JoinColumn()
  company: Company;

  @OneToMany(() => Cabinet, (cabinet) => cabinet.inventory)
  cabinets: Cabinet[];
}

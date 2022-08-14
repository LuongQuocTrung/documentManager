import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseModel from "./Base";
import Cabinet from "./Cabinet";
import Document from "./Document";
@Entity("Drawer")
export default class Drawer extends BaseModel {
  @Column()
  name: string;

  @Column()
  active: boolean;

  @ManyToOne(() => Cabinet, (cabinet) => cabinet.drawers)
  @JoinColumn()
  cabinet: Cabinet;

  @OneToMany(() => Document, (document) => document.drawer)
  documents: Document[];
}

import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import BaseModel from "./Base";
import Drawer from "./Drawer";
import Staff from "./Staff";

@Entity("Document")
export default class Document extends BaseModel {
  @Column()
  title: String;

  @Column()
  description: string;

  @Column({ default: "waiting" })
  status: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: string;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: string;

  @ManyToOne(() => Staff, (staff) => staff.documents)
  @JoinColumn()
  staff: Staff;

  @ManyToOne(() => Drawer, (drawer) => drawer.documents)
  @JoinColumn()
  drawer: Drawer;
}

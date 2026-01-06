import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Orders } from "../orders/order_entity";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, nullable: true })
  fullName: string;

  @Column({ length: 60, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ length: 10, nullable: true })
  phoneNumber: string;

  @Column({ type: "enum", enum: UserRoles, default: UserRoles.USER })
  role: string;

  @Column({ nullable: true, length: 60 })
  streetAddress: string;

  @Column({ nullable: true, length: 30 })
  city: string;

  @Column({ nullable: true, length: 60 })
  suburb: string;

  @Column({ nullable: true, length: 4 })
  postalCode: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Orders, order => order.user)
  orders: Orders[];
}
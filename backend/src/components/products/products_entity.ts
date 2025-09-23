import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum Categories {
  BURGERS = "burgers",
  PIZZAS = "pizzas",
  DESSERTS = "desserts",
  WINGS = "wings",
  COMBOS = "combos",
  RIBS = "ribs",
}

@Entity()
export class Products {
  @PrimaryGeneratedColumn("uuid")
  productId: string;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true})
  ingredients: string;

  @Column({ type: "enum", enum: Categories })
  category: Categories;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

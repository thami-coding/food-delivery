import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "test_table" })
export class TestEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("text")
  name!: string
}

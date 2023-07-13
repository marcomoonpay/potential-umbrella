import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Email {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  public target!: string;

  @Column()
  public address!: string;

  @Column()
  public emailBody!: string;

  @Column("boolean", { default: false })
  public sent!: boolean;
}

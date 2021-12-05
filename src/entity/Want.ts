import { User } from "./User";
import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Want extends BaseEntity {
  @Field() // For graphql-type
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    nullable: true,
  })
  source: string;

  @Field()
  @Column("date", {
    default: () => "(CURRENT_DATE)",
  })
  dateAdded: string;

  @Field(() => Int)
  @Column()
  daysToDelay: number;

  @Field(() => Float)
  @Column()
  price: number;

  @Field()
  @Column({
    nullable: true,
  })
  note: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.wants, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;
}

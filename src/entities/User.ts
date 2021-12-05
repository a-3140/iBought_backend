import { Category } from "./Category";
import { Want } from "./Want";
import { ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Field } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field() // For graphql-type
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  age: number;

  @Field(() => [Want], { nullable: true })
  @OneToMany(() => Want, (want) => want.user, {
    // Allows wants to be added through User entitiy
    cascade: true,
  })
  wants: Want[];

  @Field(() => [Category], { nullable: true })
  @OneToMany(() => Category, (category) => category.user, {
    cascade: true,
  })
  categories: Category[];
}

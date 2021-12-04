import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => Number, { nullable: true })
  age: number;
}
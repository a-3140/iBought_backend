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

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => Number, { nullable: true })
  age: number;
}

import { Field, Float, InputType, Int } from "type-graphql";

@InputType()
export class CreateWantInput {
  @Field(() => String)
  user_id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  dateAdded: string;

  @Field(() => Int)
  daysToDelay: number;

  @Field(() => Float)
  price: number;

  @Field(() => String, { nullable: true })
  category: string;

  @Field(() => String, { nullable: true })
  note: string;

  @Field(() => String, { nullable: true })
  source: string;
}

@InputType()
export class UpdateWantInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  dateAdded: string;

  @Field(() => Number, { nullable: true })
  daysToDelay: number;

  @Field(() => Float, { nullable: true })
  price: number;

  @Field(() => String, { nullable: true })
  category: string;

  @Field(() => String, { nullable: true })
  note: string;

  @Field(() => String, { nullable: true })
  source: string;
}

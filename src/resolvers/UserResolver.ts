import { UpdateUserInput, RegisterUserInput } from "./Inputs";
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities";

@ObjectType()
class AuthResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  // Use get getRepository if innerJoin is needed
  @Query(() => User)
  getUserOnlyById(@Arg("id", () => String) id: string) {
    return User.findOne({
      cache: true,
      where: { id: id },
    });
  }

  @Mutation(() => User)
  async Register(
    @Arg("data", () => RegisterUserInput) data: RegisterUserInput
  ) {
    const user = await User.create(data).save();
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput
  ) {
    await User.update({ id: id }, data);
    return User.findOne({
      where: { id: id },
    });
  }
}

import { UpdateUserInput } from "./UserInput";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "./../entity/User";
import { CreateUserInput } from "./UserInput";

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
  async createUser(@Arg("data", () => CreateUserInput) data: CreateUserInput) {
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

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "./../entity/User";
import { Want } from "./../entity/Want";
import { CreateUserInput } from "./UserInput";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  //   async userById(@Arg("id", () => String) id: string) {
  async userss() {
    const connection = getConnection();
    const wantRepository = connection.getRepository(Want);
    const user = await wantRepository.find({ relations: ["wants"] });
    // return await this.wantRepository.find({
    //   relations: ["images", "user"],
    //   where: { user: { id: id } },
    // });
    return user;
  }

  @Mutation(() => User)
  async createUser(@Arg("data", () => CreateUserInput) data: CreateUserInput) {
    const user = await User.create(data).save();
    return user;
  }
}

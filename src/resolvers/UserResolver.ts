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
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

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
    const hashedPassword = await hash(data.password, 13);
    const user = await User.create({
      ...data,
      password: hashedPassword,
    }).save();
    return user;
  }

  @Mutation(() => AuthResponse)
  async Login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Could not find user");
    }

    const verify = compare(password, user.password);

    if (!verify) {
      throw new Error("Bad password");
    }

    return {
      accessToken: sign({ userId: user.id }, "MySecretKey", {
        expiresIn: "15m",
      }),
    };
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

import { CreateWantInput, UpdateWantInput } from "./WantInput";
import { Want } from "../entity/Want";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class WantResolver {
  @Query(() => [Want])
  wants() {
    return Want.find();
  }

  @Mutation(() => Want)
  async createWant(
    @Arg("options", () => CreateWantInput) options: CreateWantInput
  ) {
    const want = await Want.create(options).save();
    return want;
  }

  @Mutation(() => Want)
  async updateWant(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateWantInput) data: UpdateWantInput
  ) {
    await Want.update({ id }, data);
    return Want.findOne({
      where: { id },
    });
  }

  @Mutation(() => String)
  async removeWant(@Arg("id", () => String) id: string) {
    await Want.delete({ id });
    return `Deleted ${id}`;
  }
}

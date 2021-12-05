import { CreateWantInput, UpdateWantInput } from "./WantInput";
import { Want } from "../entity/Want";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class WantResolver {
  @Query(() => [Want])
  getWantsByUserId(@Arg("id", () => String) id: string) {
    return Want.find({
      cache: true,
      relations: ["user"],
      where: { user_id: id },
    });
  }

  @Mutation(() => Want)
  async addWantByUser(
    @Arg("data", () => CreateWantInput) data: CreateWantInput
  ) {
    const want = await Want.create(data).save();
    return want;
  }

  // Currently returning updated object
  // * Might change depending on frontend implementation of update
  @Mutation(() => Want)
  async updateWant(
    @Arg("itemId", () => String) itemId: string,
    @Arg("data", () => UpdateWantInput) data: UpdateWantInput
  ) {
    const current = Want.findOne({ id: itemId });
    await Want.update({ id: itemId }, { ...current, ...data });
    return Want.findOne({
      where: { id: itemId },
    });
  }

  @Mutation(() => String)
  async removeWant(@Arg("id", () => String) id: string) {
    await Want.delete({ id });
    return `Deleted ${id}`;
  }
}

import { CreateWantInput, UpdateWantInput } from "./WantInput";
import { Want } from "../entity/Want";
import { User } from "../entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class WantResolver {
  @Query(() => [Want])
  getAllWantsByUserId(@Arg("id", () => String) id: string) {
    return Want.find({
      cache: true,
      relations: ["user"],
      where: { user_id: id },
    });
  }

  @Mutation(() => Want)
  async addWantByUser(
    @Arg("userId", () => String) userId: string,
    @Arg("data", () => CreateWantInput) data: CreateWantInput
  ) {
    const user = await User.findOne({ id: userId }, { relations: ["wants"] });
    const want = Want.create(data);
    user?.wants.push(want);
    await user?.save();
    return want;
  }

  // * Currently returning updated object
  // * Might change depending on frontend implementation of update
  @Mutation(() => Want)
  async updateWantByItemId(
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
  async removeWantByItemId(@Arg("id", () => String) id: string) {
    await Want.delete({ id });
    return `Deleted ${id}`;
  }
}

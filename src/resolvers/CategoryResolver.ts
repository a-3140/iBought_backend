import { User, Category } from "../entities";
import { CreateCategoryInput, UpdateCategoryInput } from "./Inputs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  getAllCategoriesByUserId(@Arg("id", () => String) id: string) {
    return Category.find({
      cache: true,
      relations: ["user"],
      where: { user_id: id },
    });
  }

  @Mutation(() => Category)
  async addCategoryByUserId(
    @Arg("userId", () => String) userId: string,
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput
  ) {
    const user = await User.findOne(
      { id: userId },
      { relations: ["categories"] }
    );
    const category = Category.create(data);
    if (user && user?.categories.length > 9) {
      throw new Error("Currently maximum number of categories for user is 10");
    }
    user?.categories.push(category);
    await user?.save();
    return category;
  }

  @Mutation(() => Category)
  async updateCategoryById(
    @Arg("categoryId", () => String) categoryId: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput
  ) {
    const current = Category.findOne({ id: categoryId });
    await Category.update({ id: categoryId }, { ...current, ...data });
    return Category.findOne({
      where: { id: categoryId },
    });
  }

  @Mutation(() => Boolean)
  async removeCategoryById(@Arg("id", () => String) id: string) {
    const category = await Category.findOne({ id: id });
    if (!category) {
      throw new Error(`The category with id: ${id} does not exist!`);
    }
    await Category.delete({ id: id });
    return true;
  }
}

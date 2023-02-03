import { Action, Ctx, Update } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { CategoryService } from '../../category/category.service';

@Update()
export class CategoryAction {
  constructor(private readonly categoryService: CategoryService) {}

  @Action(/^CATEGORY:[0-9a-z-]+$/)
  public async openCategoryInfo(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    const categoryUuid: string =
      context.update.callback_query.data.split(':')[1];

    const info = await this.categoryService.findCategoryInfoByUuid(
      categoryUuid,
    );

    await context.removePreviousKeyboard();

    await context.scene.enter('categories-info-scene', {
      category: info.category.name,
      wordsInCategory: Number(info.wordsInCategory),
      categoryUuid: info.category.uuid,
    });
  }
}

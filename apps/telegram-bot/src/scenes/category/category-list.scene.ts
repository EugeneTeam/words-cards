import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { CategoryService } from '../../category/category.service';
import { DEFAULT_LIMIT } from '../../../../../common/constants/pagination-default.constant';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { RowsAndCountInterface } from '../../../../../common/interfaces/rows-and-count.interface';
import { CategoryInterface } from '../../category/interfaces/category.interface';

@Scene('categories-list-scene')
export class CategoryListScene {
  private readonly sceneName = 'categories-list-scene';
  constructor(private readonly categoryService: CategoryService) {}

  @SceneEnter()
  public async list(@Ctx() context: ContextInterface): Promise<void> {
    const limit = context.scene?.state?.limit
      ? Number(context.scene.state.limit)
      : DEFAULT_LIMIT;

    const offset = context.scene?.state?.offset
      ? Number(context.scene.state.offset)
      : 0;

    const categories: RowsAndCountInterface<CategoryInterface> =
      await this.categoryService.findAllCategoriesAndCountByUserUuid({
        userUuid: context.session.userUuid,
        pagination: {
          offset,
          limit,
        },
      });

    const builder = new UiBuilderUtil(context.languageIso)
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle('category-list')
      .useTitleKeyAsText(true);

    for (const category of categories?.rows) {
      builder.addButton(category.name, `CATEGORY:${category.uuid}`, true);
    }

    const buttonBackDisabled = offset - 1 < 0;
    const buttonNextDisabled =
      Number(categories.currentPage) === Number(categories.maxPage);

    // Limit 0 instead of navigation button. If Limit = 0, pagination front/back buttons will be ignored
    const next = `PAGINATION-CATEGORY:${this.sceneName}:${
      buttonNextDisabled ? 0 : limit
    }:${(offset + 1) * limit}`;

    const back = `PAGINATION-CATEGORY:${this.sceneName}:${
      buttonBackDisabled ? 0 : limit
    }:${(offset / limit - 1) * limit}`;

    const info = `${categories.currentPage}/${categories.maxPage}`;

    const result = builder
      .addButton(buttonBackDisabled ? '🔓' : '<', back)
      .addButton(info, '...')
      .addButton(buttonNextDisabled ? '🔓' : '>', next, true)
      .addBackButton('category-menu-scene')
      .build();

    await context.removePreviousKeyboard();

    await context.reply(result.title, result.buttons);
  }
}

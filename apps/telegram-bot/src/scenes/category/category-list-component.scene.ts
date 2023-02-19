import { ContextInterface } from '../../interfaces/context.interface';
import { CategoryService } from '../../category/category.service';
import { DEFAULT_LIMIT } from '../../../../../common/constants/pagination-default.constant';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { RowsAndCountInterface } from '../../../../../common/interfaces/rows-and-count.interface';
import { CategoryInterface } from '../../category/interfaces/category.interface';
import { Action } from 'nestjs-telegraf';

/**
 * Reusable Component
 */
export class CategoryListComponentScene {
  /**
   * The name of the scene to redraw. Each time you go to the next or previous page, you need to re-render the component
   * @private
   */
  private readonly sceneName;
  /**
   * Required to get a list of categories
   * @private
   */
  private readonly categoryService;
  /**
   * The name of the callback when the category button is clicked
   * @private
   */
  private readonly categoryCallback;
  constructor(
    categoryService: CategoryService,
    sceneName: string,
    categoryCallback: string,
  ) {
    this.sceneName = sceneName;
    this.categoryService = categoryService;
    this.categoryCallback = categoryCallback;
  }

  public async renderList(
    context: ContextInterface,
    limitFrom: number | null = null,
    offsetFrom: number | null = null,
  ): Promise<void> {
    const limit =
      limitFrom ||
      (context.scene?.state?.limit
        ? Number(context.scene.state.limit)
        : DEFAULT_LIMIT);

    const offset =
      offsetFrom ||
      (context.scene?.state?.offset ? Number(context.scene.state.offset) : 0);

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
      builder.addButton(
        category.name,
        `${this.categoryCallback}:${category.uuid}`,
        true,
      );
    }

    const buttonBackDisabled = offset <= 0;
    const buttonNextDisabled =
      Number(categories.currentPage) === Number(categories.maxPage);

    // Limit 0 instead of navigation button. If Limit = 0, pagination front/back buttons will be ignored
    const next = `PAGINATION-CATEGORY:${this.sceneName}:${
      buttonNextDisabled ? 0 : limit
    }:${(offset / limit + 1) * limit}`;
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

import { ContextInterface } from '../../interfaces/context.interface';
import { CategoryService } from '../../category/category.service';
import { DEFAULT_LIMIT } from '../../../../../common/constants/pagination-default.constant';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { RowsAndCountInterface } from '../../../../../common/interfaces/rows-and-count.interface';
import { CategoryInterface } from '../../category/interfaces/category.interface';
import { Action } from 'nestjs-telegraf';
import { CategoryListComponentDataInterface } from '../interfaces/category-list-component-data.interface';
import { BackButtonOptionsInterface } from '../interfaces/back-button-option.interface';
import { WizardUtilsExtend } from '../../extends/wizard-utils.extend';

/**
 * Reusable Component
 */
export class CategoryListComponentScene extends WizardUtilsExtend {
  /**
   * The name of the scene to redraw. Each time you go to the next or previous page, you need to re-render the component
   * @private
   */
  private readonly sceneName: string;
  /**
   * Required to get a list of categories
   * @public
   */
  public categoryService: CategoryService;
  /**
   * The name of the callback when the category button is clicked
   * @private
   */
  private readonly categoryCallback: string;
  private readonly customBackButtonOptions: BackButtonOptionsInterface;
  constructor(option: CategoryListComponentDataInterface) {
    super();
    this.sceneName = option.sceneName;
    this.categoryService = option.categoryService;
    this.categoryCallback = option.categoryCallback;
    this.customBackButtonOptions = option.customBackButtonOptions;
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

    if (!categories.rows?.length && Number(categories.count) === 0) {
      await this.deleteLastKeyboard(context);
      await this.deleteLastMessage(context);

      const builder = new UiBuilderUtil(context.languageIso)
        .useInlineKeyboardMethod()
        .addNewButtonLine()
        .addTitle('category-list-is-empty');
      let result;
      if (
        !this.customBackButtonOptions.disableBackButton &&
        this.customBackButtonOptions?.title &&
        this.customBackButtonOptions?.callback
      ) {
        result = builder
          .addNewButtonLine()
          .addButton(
            this.customBackButtonOptions.title,
            this.customBackButtonOptions.callback,
          )
          .build();
      } else {
        result = builder
          .addBackButton(this.customBackButtonOptions.transitionSceneName)
          .build();
      }

      await context.reply(result.title, result.buttons);
    } else {
      let builder = new UiBuilderUtil(context.languageIso)
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
      builder = builder
        .addButton(buttonBackDisabled ? '🔓' : '<', back)
        .addButton(info, '...')
        .addButton(buttonNextDisabled ? '🔓' : '>', next, true);

      if (
        !this.customBackButtonOptions.disableBackButton &&
        this.customBackButtonOptions?.title &&
        this.customBackButtonOptions?.callback
      ) {
        builder = builder
          .addNewButtonLine()
          .useTitleKeyAsText(false)
          .addButton(
            this.customBackButtonOptions.title,
            this.customBackButtonOptions.callback,
          );
      }

      let result;
      if (
        !this.customBackButtonOptions.disableBackButton &&
        this.customBackButtonOptions.transitionSceneName
      ) {
        result = builder
          .addBackButton(this.customBackButtonOptions.transitionSceneName)
          .build();
      } else {
        result = builder.build();
      }
      await this.deleteLastKeyboard(context);
      await this.deleteLastMessage(context);

      await context.reply(result.title, result.buttons);
    }
  }

  @Action('...')
  private plug() {
    /**...**/
  }
}

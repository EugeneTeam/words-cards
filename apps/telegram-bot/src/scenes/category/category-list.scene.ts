import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { CategoryService } from '../../category/category.service';
import { DEFAULT_LIMIT } from '../../../../../common/constants/pagination-default.constant';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { RowsAndCountInterface } from '../../../../../common/interfaces/rows-and-count.interface';
import { CategoryInterface } from '../../category/interfaces/category.interface';

@Scene('categories-list-scene')
export class CategoryListScene {
  constructor(private readonly categoryService: CategoryService) {}

  @SceneEnter()
  public async list(@Ctx() context: ContextInterface): Promise<void> {
    const categories: RowsAndCountInterface<CategoryInterface> =
      await this.categoryService.findAllCategoriesAndCountByUserUuid({
        userUuid: context.session.userUuid,
        pagination: {
          offset: 0,
          limit: DEFAULT_LIMIT,
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

    const result = builder.build();

    await context.reply(result.title, result.buttons);
  }
}

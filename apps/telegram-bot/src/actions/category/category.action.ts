import { Action, Ctx, Update } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { CategoryService } from '../../category/category.service';
import { WizardUtilsExtend } from '../../extends/wizard-utils.extend';

@Update()
export class CategoryAction extends WizardUtilsExtend {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  @Action(/^PAGINATION-CATEGORY:[0-9a-z\-]+:[0-9]+:[0-9]+$/)
  public async pagination(@Ctx() context: ContextInterface): Promise<void> {
    const data: string[] = context.update.callback_query.data.split(':');
    const scene: string = data[1];
    const limit = Number(data[2]);
    const offset = Number(data[3]);

    if (limit > 0) {
      await context.scene.enter(scene, {
        limit,
        offset,
      });
    } else {
      return;
    }
  }

  @Action(/^CATEGORY:[0-9a-z-]+$/)
  public async openCategoryInfo(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    const categoryUuid: string =
      context.update.callback_query.data.split(':')[1];

    const info = await this.categoryService.findCategoryInfoByUuid(
      categoryUuid,
    );

    await this.deleteLastKeyboard(context);

    await context.scene.enter('categories-info-wizard', {
      category: info.category.name,
      wordsInCategory: Number(info.wordsInCategory),
      categoryUuid: info.category.uuid,
    });
  }
}

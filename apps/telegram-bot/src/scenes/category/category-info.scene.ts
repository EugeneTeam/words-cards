import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { ContextInterface } from '../../interfaces/context.interface';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { CategoryInfoInterface } from '../../category/interfaces/category-info.interface';

@Scene('categories-info-scene')
export class CategoryInfoScene {
  @SceneEnter()
  public async categoryInfo(@Ctx() context: ContextInterface): Promise<void> {
    const { category, wordsInCategory, categoryUuid } = context.scene.state;

    const reqw = new UiBuilderUtil(context.languageIso)
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle<CategoryInfoInterface>('category-info', {
        category,
        wordsInCategory,
      })
      .addButton('remove', 'asd', true)
      .addButton('edit', 'asd')
      .build();

    await context.replyWithHTML(reqw.title, reqw.buttons);
  }
}

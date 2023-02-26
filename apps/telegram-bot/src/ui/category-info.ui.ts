import { UiBuilderPanelInterface } from '../utils/ui-builder/interfaces/ui-builder-panel.interface';
import { UiBuilderUtil } from '../utils/ui-builder/ui-builder.util';
import { CategoryInfoInterface } from '../category/interfaces/category-info.interface';
import { ContextInterface } from '../interfaces/context.interface';

export const CategoryInfoUi = (
  context: ContextInterface,
): UiBuilderPanelInterface => {
  const { category, wordsInCategory } = context.scene.state;
  return new UiBuilderUtil(context.languageIso)
    .useInlineKeyboardMethod()
    .addNewButtonLine()
    .addTitle<CategoryInfoInterface>('category-info', {
      category,
      wordsInCategory,
    })
    .addButton('remove', 'remove-category-question', true)
    .addButton('edit', 'edit-category-enter', true)
    .addBackButtonForWizard('back')
    .build();
};

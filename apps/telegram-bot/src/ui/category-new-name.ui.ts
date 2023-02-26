import { UiBuilderUtil } from '../utils/ui-builder/ui-builder.util';
import { CategoryNewNameInterface } from '../translator/interfaces/category-new-name.interface';
import { ContextInterface } from '../interfaces/context.interface';
import { UiBuilderPanelInterface } from '../utils/ui-builder/interfaces/ui-builder-panel.interface';

export const CategoryNewNameUi = (
  context: ContextInterface,
  newCategoryName: string,
): UiBuilderPanelInterface => {
  return new UiBuilderUtil(context.languageIso)
    .useInlineKeyboardMethod()
    .addNewButtonLine()
    .addTitle<CategoryNewNameInterface>('category-new-name', {
      newCategory: newCategoryName,
      oldCategory: context.wizard.state.category,
    })
    .addButton('accept', 'save')
    .addButton('cancel-checkmark', 'cancel')
    .build();
};

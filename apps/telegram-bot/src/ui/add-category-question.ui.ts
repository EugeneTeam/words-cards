import { UiBuilderUtil } from '../utils/ui-builder/ui-builder.util';
import { ContextInterface } from '../interfaces/context.interface';
import { UiBuilderPanelInterface } from '../utils/ui-builder/interfaces/ui-builder-panel.interface';

export const AddCategoryQuestionUi = (
  context: ContextInterface,
  categories: string[],
): UiBuilderPanelInterface => {
  return new UiBuilderUtil(context.languageIso)
    .useInlineKeyboardMethod()
    .addNewButtonLine()
    .addTitle<{ categories: string }>('add-category-question', {
      categories: categories.join('\n'),
    })
    .addButton('save', 'save')
    .addButton('cancel', 'cancel')
    .build();
};

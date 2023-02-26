import { UiBuilderUtil } from '../utils/ui-builder/ui-builder.util';
import { ContextInterface } from '../interfaces/context.interface';
import { UiBuilderPanelInterface } from '../utils/ui-builder/interfaces/ui-builder-panel.interface';

export const CategoryRemoveUi = (
  context: ContextInterface,
): UiBuilderPanelInterface => {
  return new UiBuilderUtil(context.languageIso)
    .useInlineKeyboardMethod()
    .addNewButtonLine()
    .addTitle<{ category: string }>('category-remove', {
      category: context.wizard.state.category,
    })
    .addButton('accept', 'remove')
    .addButton('cancel-checkmark', 'cancel')
    .build();
};

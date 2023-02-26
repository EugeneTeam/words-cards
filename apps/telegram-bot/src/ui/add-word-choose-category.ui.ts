import { UiBuilderUtil } from '../utils/ui-builder/ui-builder.util';
import { UiBuilderPanelInterface } from '../utils/ui-builder/interfaces/ui-builder-panel.interface';
import { ContextInterface } from '../interfaces/context.interface';

export const AddWordChooseCategoryUi = (
  context: ContextInterface,
): UiBuilderPanelInterface => {
  return new UiBuilderUtil(context.languageIso)
    .useInlineKeyboardMethod()
    .addNewButtonLine()
    .addTitle('add-word-choose-category')
    .addButton('add', 'choose-category')
    .addButton('skip', 'skip-category')
    .build();
};

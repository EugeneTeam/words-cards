import { UiBuilderPanelInterface } from '../utils/ui-builder/interfaces/ui-builder-panel.interface';
import { ContextInterface } from '../interfaces/context.interface';
import { UiBuilderUtil } from '../utils/ui-builder/ui-builder.util';

export const AddMediaQuestionUi = (
  context: ContextInterface,
): UiBuilderPanelInterface => {
  return new UiBuilderUtil(context.languageIso)
    .useInlineKeyboardMethod()
    .addNewButtonLine()
    .addTitle('add-media-question')
    .addButton('add', 'add-media')
    .addButton('skip', 'skip')
    .build();
};

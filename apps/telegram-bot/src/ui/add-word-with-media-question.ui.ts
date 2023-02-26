import { UiBuilderUtil } from '../utils/ui-builder/ui-builder.util';
import { UiBuilderPanelInterface } from '../utils/ui-builder/interfaces/ui-builder-panel.interface';
import { ContextInterface } from '../interfaces/context.interface';
import { AddWordWithMediaQuestionInterface } from '../translator/interfaces/add-word-with-media-question.interface';

export const AddWordWithMediaQuestionUi = (
  context: ContextInterface,
  data: AddWordWithMediaQuestionInterface,
): UiBuilderPanelInterface => {
  return new UiBuilderUtil(context.languageIso)
    .useInlineKeyboardMethod()
    .addNewButtonLine()
    .addTitle<AddWordWithMediaQuestionInterface>(
      'add-word-with-media-question',
      data,
    )
    .build();
};

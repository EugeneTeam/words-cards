import { UiBuilderUtil } from '../utils/ui-builder/ui-builder.util';
import { UiBuilderPanelInterface } from '../utils/ui-builder/interfaces/ui-builder-panel.interface';
import { ContextInterface } from '../interfaces/context.interface';

export const AddWordAddNoteQuestionUi = (
  context: ContextInterface,
): UiBuilderPanelInterface => {
  return new UiBuilderUtil(context.languageIso)
    .useInlineKeyboardMethod()
    .addNewButtonLine()
    .addTitle('add-word-add-note-question')
    .addButton('add', 'add-note')
    .addButton('skip', 'skip-note')
    .build();
};

import { Action, Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { ConfigurationService } from '../../configuration/configuration.service';
import { ContextInterface } from '../../interfaces/context.interface';
import { ConfigurationInterface } from '../../configuration/interfaces/configuration.interface';
import { WizardUtilsExtend } from '../../extends/wizard-utils.extend';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { UiBuilderPanelInterface } from '../../utils/ui-builder/interfaces/ui-builder-panel.interface';
import { AddWordQuestion } from '../../translator/interfaces/add-word-question';
import { WordService } from '../../word/word.service';
import { StatusInterface } from '../../common/interfaces/status.interface';

@Wizard('add-word-wizard-short')
export class AddWordShortWizard extends WizardUtilsExtend {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly wordService: WordService,
  ) {
    super();
  }

  @WizardStep(1)
  public async enterWordInfo(@Ctx() context: ContextInterface): Promise<void> {
    const config: ConfigurationInterface =
      await this.configurationService.findOneByUserUuid({
        uuid: context.session.userUuid,
      });

    context.wizard.state.defaultLanguageForNewWord =
      config.defaultLanguageForNewWord;
    context.wizard.state.defaultLanguageForWordTranslation =
      config.defaultLanguageForWordTranslation;

    await context.replyWithHTML(
      context.translatorService.getTranslate('add-word-short'),
    );
    await context.wizard.next();
  }

  @WizardStep(2)
  public async enterWord(@Ctx() context: ContextInterface): Promise<void> {
    const pattern: string = this.getMessageText(context);

    if (
      !/^[a-zA-Zа-яА-Я]+[ ]\-[ ]([a-zA-Zа-яА-Я]+((, )|(,))?)+/.test(pattern)
    ) {
      await context.replyWithHTML(
        context.translatorService.getTranslate(
          'add-word-short-invalid-pattern',
        ),
      );
      return;
    }

    const splitPattern: string[] = pattern.split('-');
    const word: string = splitPattern[0].trim();
    const translations: string[] = splitPattern[1]
      .split(',')
      .map((translation: string) => translation.trim());

    context.wizard.state.word = word;
    context.wizard.state.translations = translations;

    const UI: UiBuilderPanelInterface = new UiBuilderUtil(context.languageIso)
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .useTitleKeyAsText(true)
      .addTitle(
        context.translatorService.getTranslate<AddWordQuestion>(
          'add-word-question',
          {
            word,
            translations: translations.join(', '),
          },
        ),
      )
      .useTitleKeyAsText(false)
      .addButton('save', 'save', true)
      .addButton('cancel', 'cancel', true)
      .build();

    await context.replyWithHTML(UI.title, UI.buttons);

    await context.wizard.next();
  }
  // TODO Add actions
  // TODO Save word to db
  @Action('save')
  public async save(@Ctx() context: ContextInterface): Promise<void> {
    const word: string = context.wizard.state.word;
    const translations: string[] = context.wizard.state.translations;

    const result: StatusInterface = await this.wordService.create({
      word: {
        word,
      },
      userUuid: context.session.userUuid,
      translations: {
        translations,
      },
    });
  }
}

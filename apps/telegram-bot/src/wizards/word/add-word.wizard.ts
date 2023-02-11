import { Action, Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { ConfigurationService } from '../../configuration/configuration.service';
import { ContextInterface } from '../../interfaces/context.interface';
import { ConfigurationInterface } from '../../configuration/interfaces/configuration.interface';
import { WizardUtilsExtend } from '../../extends/wizard-utils.extend';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { WordService } from '../../word/word.service';
import { FileService } from '../../file/file.service';

@Wizard('add-word-wizard')
export class AddWordWizard extends WizardUtilsExtend {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly fileService: FileService,
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
      context.translatorService.getTranslate('word-enter'),
    );

    await context.wizard.next();
  }

  @WizardStep(2)
  private async enterWord(@Ctx() context: ContextInterface): Promise<void> {
    context.wizard.state.word = this.getMessageText(context);
    await context.reply(
      context.translatorService.getTranslate('word-translation'),
    );
    await context.wizard.next();
  }

  @WizardStep(2)
  private async enterTranslation(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    context.wizard.state.translation = this.getMessageText(context);

    await context.wizard.next();
    await this.renderWizardStep(context, 3);
  }

  @WizardStep(3)
  private async addMediaQuestion(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    const uiBuild = new UiBuilderUtil(context.languageIso)
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .addTitle('add-media-question')
      .addButton('add', 'add-media')
      .addButton('skip', 'skip')
      .build();

    await context.replyWithHTML(uiBuild.title, uiBuild.buttons);
  }

  @WizardStep(4)
  private async mediaUpload(@Ctx() context: ContextInterface): Promise<void> {
    // TODO not completed
    await this.fileService.getFileFromTelegrafContext(context);
  }

  @Action('add-media')
  private async addMedia(@Ctx() context: ContextInterface): Promise<void> {
    await context.wizard.next();
  }
}

import { Action, Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { ConfigurationService } from '../../configuration/configuration.service';
import { ContextInterface } from '../../interfaces/context.interface';
import { ConfigurationInterface } from '../../configuration/interfaces/configuration.interface';
import { UiBuilderUtil } from '../../utils/ui-builder/ui-builder.util';
import { FileService } from '../../file/file.service';
import { UploadFileResponseInterface } from '../../file/interfaces/upload-file-response.interface';
import { CategoryService } from '../../category/category.service';
import { AddWordIsolation } from './add-word.isolation';

@Wizard('add-word-wizard')
export class AddWordWizard extends AddWordIsolation {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly fileService: FileService,
    categoryService: CategoryService,
  ) {
    super(categoryService, 'add-word-wizard', 'test');
  }

  @WizardStep(1)
  public async enterWordInfo(@Ctx() context: ContextInterface): Promise<void> {
    const config: ConfigurationInterface =
      await this.configurationService.findOneByUserUuid({
        uuid: context.session.userUuid,
      });
    context.wizard.state.defaultLanguageForNewWord =
      config.defaultLanguageForNewWord.uuid;
    context.wizard.state.defaultLanguageForWordTranslation =
      config.defaultLanguageForWordTranslation.uuid;

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

  @WizardStep(3)
  private async enterTranslation(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    context.wizard.state.translation = this.getMessageText(context);
    await context.wizard.next();
    await this.renderWizardStep(context, 4);
  }

  @WizardStep(4)
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

    context.wizard.state.check = true;

    await context.replyWithHTML(uiBuild.title, uiBuild.buttons);
    await context.wizard.next();
  }

  @WizardStep(5)
  private async buffer(@Ctx() context: ContextInterface): Promise<void> {
    await context.reply('Ожидается действие пользователя');
  }

  @WizardStep(6)
  private async mediaUpload(@Ctx() context: ContextInterface): Promise<void> {
    // Protection against downloading multiple files at the same time
    if (context.wizard.state.check) {
      context.wizard.state.check = false;
      const result: UploadFileResponseInterface =
        await this.fileService.getFileFromTelegrafContext(context);
      if (!result.status) {
        context.wizard.state.check = true;
        await context.reply('Неизвестный тип файла');
      } else {
        await context.reply('Файл добавлен');
        await this.renderWizardStep(context, 7);
        await context.wizard.next();
      }
    } else {
      await context.reply(
        'При загрузке более 1 файла все файлы кроме первого будут проигнорированы.',
      );
    }
  }

  @WizardStep(7)
  private async as(@Ctx() context: ContextInterface): Promise<void> {
    const uiBuild = new UiBuilderUtil(context.languageIso)
      .useInlineKeyboardMethod()
      .addNewButtonLine()
      .useTitleKeyAsText(true)
      .addTitle('Выбрать категорию?')
      .useTitleKeyAsText(false)
      .addButton('add', 'choose-category')
      .addButton('skip', 'skip-category')
      .build();
    await context.replyWithHTML(uiBuild.title, uiBuild.buttons);
    await context.wizard.next();
  }

  // TODO добавить финальный шаг с полной информацией, категорией + медиа файлом для подтверждения сохранения записи

  @WizardStep(5)
  private async buffer1(@Ctx() context: ContextInterface): Promise<void> {
    await context.reply('Ожидается действие пользователя');
  }

  @Action('add-media')
  private async addMedia(@Ctx() context: ContextInterface): Promise<void> {
    // got to step 5
    await context.wizard.next();

    await context.removePreviousKeyboard();
    // TODO все сообщения вынести в ru.json
    await context.replyWithHTML(
      `<b>Ожидается загрузка файлов</b>. 
Вы можете загрузить <b>аудио</b>, <b>видео</b>, <b>картинку</b> или записать <b>голосовое сообщение</b>.

Доступны следующие варианты загрузки файлов:
🔘Картинка (картинки без сжатия доступны в следующих форматах: png, jpg, webp)
🔘Видео
🔘Аудио
🔘Голосовое сообщение
`,
    );
  }

  @Action('skip')
  private async skip(@Ctx() context: ContextInterface): Promise<void> {
    await context.removePreviousKeyboard();
    await this.renderWizardStep(context, 7);
  }
}

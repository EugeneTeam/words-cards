import { Action, Ctx, Wizard, WizardStep } from 'nestjs-telegraf';
import { ConfigurationService } from '../../configuration/configuration.service';
import { ContextInterface } from '../../interfaces/context.interface';
import { ConfigurationInterface } from '../../configuration/interfaces/configuration.interface';
import { FileService } from '../../file/file.service';
import { UploadFileResponseInterface } from '../../file/interfaces/upload-file-response.interface';
import { CategoryService } from '../../category/category.service';
import { AddWordIsolation } from './add-word.isolation';
import { ContentTypeEnum } from '../../file/enums/content-type.enum';
import { join } from 'path';
import { createReadStream } from 'fs';
import { AddMediaQuestionUi } from '../../ui/add-media-question.ui';
import { Markup } from 'telegraf';
import { WordService } from '../../word/word.service';
import { AddWordChooseCategoryUi } from '../../ui/add-word-choose-category.ui';
import { AddWordAddNoteQuestionUi } from '../../ui/add-word-add-note-question.ui';
import { AddWordWithMediaQuestionUi } from '../../ui/add-word-with-media-question.ui';
import { WordFileService } from '../../word-file/word-file.service';

@Wizard('add-word-wizard')
export class AddWordWizard extends AddWordIsolation {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly wordService: WordService,
    private readonly fileService: FileService,
    private readonly wordFileService: WordFileService,
    categoryService: CategoryService,
  ) {
    super({
      customBackButtonOptions: {
        disableBackButton: false,
        callback: 'deselect-category',
        title: 'cancel',
      },
      categoryService: categoryService,
      sceneName: 'add-word-wizard',
    });
  }

  @WizardStep(1)
  public async enter(@Ctx() context: ContextInterface): Promise<void> {
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
    const { title, buttons } = AddMediaQuestionUi(context);

    context.wizard.state.check = true;

    await context.replyWithHTML(title, buttons);
    await context.wizard.next();
  }

  @WizardStep(5)
  private async buffer(@Ctx() context: ContextInterface): Promise<void> {
    await context.reply(
      context.translatorService.getTranslate('user-action-expected'),
    );
  }

  @WizardStep(6)
  private async mediaUpload(@Ctx() context: ContextInterface): Promise<void> {
    // Protection against downloading multiple files at the same time
    if (context.wizard.state.check) {
      context.wizard.state.check = false;
      const result: UploadFileResponseInterface =
        await this.fileService.saveFile(context);
      if (!result.status) {
        context.wizard.state.check = true;
        await context.reply(
          context.translatorService.getTranslate('add-word-unknown-media-type'),
        );
      } else {
        await context.reply(
          context.translatorService.getTranslate('add-word-add-media'),
        );

        context.wizard.state.file = {
          token: result.token,
          type: result.mediaType,
          uuid: result.uuid,
        };

        await this.renderWizardStep(context, 7);
        await context.wizard.next();
      }
    } else {
      await context.reply(
        context.translatorService.getTranslate('add-word-add-media-info'),
      );
    }
  }

  @WizardStep(7)
  private async addCategoryQuestion(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    const uiBuild = AddWordChooseCategoryUi(context);
    await context.replyWithHTML(uiBuild.title, uiBuild.buttons);
    await context.wizard.next();
  }

  @WizardStep(8)
  private async buffer1(@Ctx() context: ContextInterface): Promise<void> {
    await context.reply(
      context.translatorService.getTranslate('user-action-expected'),
    );
  }

  @WizardStep(9)
  private async addNoteQuestion(
    @Ctx() context: ContextInterface,
  ): Promise<void> {
    const uiBuild = AddWordAddNoteQuestionUi(context);
    await context.replyWithHTML(uiBuild.title, uiBuild.buttons);
    await context.wizard.next();
  }

  @WizardStep(10)
  private async buffer2(@Ctx() context: ContextInterface): Promise<void> {
    await context.reply(
      context.translatorService.getTranslate('user-action-expected'),
    );
  }

  @WizardStep(11)
  private async enterTheNote(@Ctx() context: ContextInterface): Promise<void> {
    // TODO добавить проверку на emoji/стикеры/файлы
    context.wizard.state.note = this.getMessageText(context);
    await context.wizard.next();
    await this.renderWizardStep(context, 12);
  }

  @WizardStep(12)
  private async test(@Ctx() context: ContextInterface): Promise<void> {
    await this.deleteLastMessage(context);
    await this.deleteLastKeyboard(context);

    const state = context.wizard.state;

    let category = null;
    if (state?.categoryUuid) {
      category = await this.categoryService.findCategoryInfoByUuid(
        state.categoryUuid,
      );
    }
    const path = join(__dirname, '..', '..', '..', 'uploads', 'files');
    const word = state.word;
    const translate = state.translation;
    const file = state.file;

    const data = {
      category: category
        ? category.category.name
        : context.translatorService.getTranslate('category-not-selected'),
      note: state?.note
        ? state.note
        : context.translatorService.getTranslate('add-word-note-not-added'),
    };
    const builder = AddWordWithMediaQuestionUi(context, {
      word,
      translate,
      category: this.addBackslash(data?.category),
      mediaIsAdd: file ? '➕' : '➖',
      note: this.addBackslash(data?.note),
    });

    const keyboard = Markup.inlineKeyboard([
      Markup.button.callback(
        context.translatorService.getTranslate('save'),
        'save-new-word',
      ),
      Markup.button.callback(
        context.translatorService.getTranslate('cancel'),
        'cancel-new-word',
      ),
    ]);

    if (file?.token && file?.type) {
      let part: string;
      let methodName: string;

      if (file.type === ContentTypeEnum.image) {
        part = 'images';
        methodName = 'replyWithPhoto';
      }

      if (file.type === ContentTypeEnum.video) {
        part = 'video';
        methodName = 'replyWithVideo';
      }

      if (
        file.type === ContentTypeEnum.voice ||
        file.type === ContentTypeEnum.audio
      ) {
        part = 'audio';
        methodName = 'replyWithAudio';
      }

      if (file.type === ContentTypeEnum.document) {
        part = 'images';
        methodName = 'replyWithDocument';
      }

      await context[methodName](
        {
          source: createReadStream(`${path}/${part}/${file.token}`),
          filename: file.token,
        },
        {
          caption: builder.title,
          parse_mode: 'MarkdownV2',
          ...keyboard,
        },
      );
    } else {
      await context.replyWithMarkdownV2(builder.title, keyboard);
    }
  }

  @Action('add-note')
  private async addNote(@Ctx() context: ContextInterface): Promise<void> {
    await context.reply(
      context.translatorService.getTranslate('add-word-enter-note'),
    );
    await this.deleteLastKeyboard(context);
    await context.wizard.next();
  }

  @Action('skip-note')
  private async skipNote(@Ctx() context: ContextInterface): Promise<void> {
    await context.wizard.next();
    await context.wizard.next();
    await this.renderWizardStep(context, 12);
  }

  @Action('add-media')
  private async addMedia(@Ctx() context: ContextInterface): Promise<void> {
    // got to step 5
    await context.wizard.next();

    await this.deleteLastKeyboard(context);

    await context.replyWithHTML(
      context.translatorService.getTranslate('add-media-info'),
    );
  }

  @Action('skip-category')
  private async skipCategory(@Ctx() context: ContextInterface): Promise<void> {
    await this.deleteLastKeyboard(context);
    await this.renderWizardStep(context, 9);
    await context.wizard.next();
  }

  @Action('skip')
  private async skip(@Ctx() context: ContextInterface): Promise<void> {
    await this.deleteLastKeyboard(context);
    await this.renderWizardStep(context, 7);
    await context.wizard.next();
    await context.wizard.next();
  }

  @Action('save-new-word')
  private async saveNewWord(@Ctx() context: ContextInterface): Promise<void> {
    const state = context.wizard.state;
    const file = state?.file;
    const word = state.word;
    const translate = state.translation;
    const categoryUuid = state.categoryUuid;
    const note = state?.note;

    const addedWord = await this.wordService.create({
      word: {
        word,
        note,
        categoryUuid,
      },
      translations: translate.split(','),
      userUuid: context.session.userUuid,
    });

    if (file?.uuid) {
      await this.wordFileService.addFileToWord(addedWord.uuid, file.uuid);
    }

    if (addedWord) {
      await this.deleteLastKeyboard(context);
      await context.reply(
        context.translatorService.getTranslate('add-word-complete'),
      );
    }
  }

  @Action('cancel-new-word')
  private async cancelNewWord(@Ctx() context: ContextInterface): Promise<void> {
    const file = context.wizard.state?.file;
    if (file?.token && file?.type) {
      await this.fileService.removeFileFromServer(file.token);
      await this.fileService.removeFileFromDB(file.type, file?.token);
    }
    await context.scene.leave();
    await context.scene.enter('word-menu-scene');
  }
}

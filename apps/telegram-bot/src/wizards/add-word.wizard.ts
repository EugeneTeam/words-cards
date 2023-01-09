import { Action, Ctx, Hears, Wizard, WizardStep } from 'nestjs-telegraf';

import { ContextInterface } from '../interfaces/context.interface';
import { validateWord } from '../utils/validator.util';
import { ConfigurationService } from '../configuration/configuration.service';
import { LanguageService } from '../language/language.service';
import { LanguagesInterface } from '../language/interfaces/languages.interface';
import { LanguageInterface } from '../language/interfaces/language.interface';
import { UiBuilderUtil } from '../utils/ui-builder/ui-builder.util';

@Wizard('add-word-wizard')
export class AddWordWizard {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly languageService: LanguageService,
  ) {}

  // SET-defaultLanguageForNewWOrd: EN
  // [OPERATION]-VARIABLE NAME: VARIABLE VALUE
  @Action(/^SET-[a-zA-Z]+:[a-zA-Z]+$/)
  private async setValue(@Ctx() context: ContextInterface): Promise<void> {
    const clearData: string = context.update.callback_query.data.replace(
      /SET-/g,
      '',
    );
    const variableName: string = clearData.split(':')[0];
    const variableValue: string = clearData.split(':')[1];
    context.wizard.state[variableName] = variableValue;
  }

  @WizardStep(1)
  public async step1(@Ctx() context: ContextInterface): Promise<void> {
    const config = await this.configurationService.findOneByUserUuid({
      uuid: context.session.userUuid,
    });
    // TODO
    //   "select-translation-language": "Выберите язык перевода"
    if (config?.isNull) {
      const data = await this.languageService.findAllLanguages();
      let builder = new UiBuilderUtil(context.languageIso)
        .useInlineKeyboardMethod()
        .addNewButtonLine()
        .addTitle('select-language-for-word')
        .useTitleKeyAsText(true);

      data.languages.forEach((language: LanguageInterface) => {
        builder = builder.addButton(
          language.name,
          `SET-defaultLanguageForNewWOrd:${language.iso}`,
          true,
        );
      });

      const result = builder.build();

      await context.wizard.next();
      await context.reply(result.title, result.buttons);
    }
  }

  @WizardStep(2)
  private async buffer1(@Ctx() context: ContextInterface): Promise<void> {
    await context.reply(
      context.translatorService.getTranslate('user-action-expected'),
    );
    return;
  }

  // await context.reply(context.translatorService.getTranslate('enter-word'));
  // await context.wizard.next();
  //
  // @WizardStep(2)
  // public async step2(@Ctx() context: ContextInterface): Promise<void> {
  //   const word = context?.update?.messate?.text || context?.message?.text;
  //
  //   if (validateWord(word)) {
  //     await context.reply(
  //       context.translatorService.getTranslate('unavailable-symbol'),
  //     );
  //     return;
  //   }
  //
  //   context.wizard.state.userId = user.telegram_id;
  //
  //   await context.replyWithHTML(content.title, content.inline_keyboard_wrapped);
  // }
  //
  // @Action('accept')
  // private async accept(@Ctx() context: any): Promise<void> {
  //   const userId = context.wizard.state.userId;
  //
  //   await this.userService.appointAdministrator(userId);
  //
  //   await deletePreviousKeyboardUtil(context);
  //
  //   const content = new ContentBuilderUtil()
  //     .addTitle('✅ Значение успешно обновлено')
  //     .addButton('🔙 Вернуться в меню администратора', 'decline')
  //     .build();
  //
  //   await context.reply(content.title, content.inline_keyboard_wrapped);
  // }
  //
  // @Action('decline')
  // private async decline(@Ctx() context: any): Promise<void> {
  //   await context.scene.leave();
  //
  //   await deletePreviousKeyboardUtil(context);
  //
  //   await context.scene.enter('admin-menu');
  // }
  //
  // @Hears(/^(❌ Отменить любой ввод данных|❌ Cancel any data entry)$/)
  // private async abort(@Ctx() context: any): Promise<void> {
  //   await context.scene.leave();
  //   await deletePreviousKeyboardUtil(context);
  //   await context.scene.enter('admin-menu');
  // }
}

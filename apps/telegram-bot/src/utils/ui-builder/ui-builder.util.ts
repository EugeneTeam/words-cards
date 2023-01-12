import { Markup } from 'telegraf';

import { ButtonInterface } from './interfaces/button.interface';
import { CALLBACK_NAME_MAX_LENGTH } from './constants/callback-name-max-length.constant';
import { CallbackExceededLengthError } from './errors/callback-exceeded-length.error';
import { UiBuilderPanelInterface } from './interfaces/ui-builder-panel.interface';
import { TranslatorService } from '../../translator/translator.service';
import { AvailableLanguagesEnum } from '../../translator/enums/available-languages.enum';

export class UiBuilderUtil {
  private currentLanguageIso: string;
  private buttons: ButtonInterface[][];
  private currentIndex: number;
  private inlineKeyboard: boolean;
  private keyboard: boolean;
  private textInsteadKey: boolean;

  private readonly translatorService: TranslatorService;
  private readonly panel: any;

  constructor(languageIso: string) {
    if (!languageIso) {
      throw new Error('Language is required');
    }

    this.currentLanguageIso = languageIso;
    this.buttons = [];
    this.currentIndex = 0;
    this.panel = {};
    this.textInsteadKey = false;

    this.translatorService = new TranslatorService(
      AvailableLanguagesEnum[this.currentLanguageIso],
    );
  }

  useInlineKeyboardMethod(): this {
    this.inlineKeyboard = true;
    this.keyboard = false;
    return this;
  }

  useKeyboardMethod(): this {
    this.inlineKeyboard = false;
    this.keyboard = true;
    return this;
  }

  public addButton<DataInterface>(
    textOrTranslateKey: string,
    callback: string | null = null,
    newLineAfterThisButton = false,
  ): this {
    let text = textOrTranslateKey;
    if (!this.textInsteadKey) {
      text =
        this.translatorService.getTranslate<DataInterface>(textOrTranslateKey);
    }

    this.buttons[this.currentIndex].push({
      callback_data: '',
      url: '',
      text,
    });

    if (callback) {
      this.addCallback(callback);
    }

    if (newLineAfterThisButton) {
      this.addNewButtonLine();
    }

    this.rewriteButtons();

    return this;
  }

  public addBackButton(sceneName: string): this {
    this.addButton('back', `BACK-TO:${sceneName}`);
    return this;
  }

  public addCallback(callback: string): this | never {
    this.isCallbackNameValid(callback);
    this.buttons[this.currentIndex][
      this.buttons[this.currentIndex].length - 1
    ].callback_data = callback;

    this.rewriteButtons();

    return this;
  }

  public addNewButtonLine(): this {
    this.buttons.push([]);
    this.currentIndex = this.buttons.length - 1;

    this.rewriteButtons();

    return this;
  }

  public useTitleKeyAsText(toggle: boolean): this {
    this.textInsteadKey = toggle;
    return this;
  }

  public addTitle<DataInterface>(
    textOrTranslateKey: string,
    data?: DataInterface,
  ): this {
    if (this.textInsteadKey) {
      this.panel.title = textOrTranslateKey;
    } else {
      this.panel.title = this.translatorService.getTranslate<DataInterface>(
        textOrTranslateKey,
        data,
      );
    }
    return this;
  }

  public build(): UiBuilderPanelInterface {
    return this.panel;
  }

  private rewriteButtons() {
    this.checkButtonsPanel();
    if (this.inlineKeyboard) {
      this.panel.buttons = Markup.inlineKeyboard(this.buttons);
    } else {
      if (this.keyboard) {
        this.panel.buttons = Markup.keyboard(this.buttons);
      } else {
        this.panel.buttons = this.buttons;
      }
    }
  }

  private checkButtonsPanel() {
    if (!this.panel?.buttons) {
      this.panel.buttons = [];
    }
  }

  private isCallbackNameValid(callback: string): void | never {
    if (callback?.length > CALLBACK_NAME_MAX_LENGTH) {
      throw new CallbackExceededLengthError(callback);
    }
  }
}

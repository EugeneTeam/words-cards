import { Context } from 'telegraf';
import { AvailableLanguagesEnum } from '../languages/enums/available-languages.enum';
import { TranslatorService } from '../languages/translator.service';

export interface ContextInterface extends Context {
  languageIso: AvailableLanguagesEnum;
  translatorService: TranslatorService;
  update: any;
  scene: any;
  removePreviousKeyboard(): Promise<void | never>;
}

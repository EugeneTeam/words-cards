import { Context } from 'telegraf';
import { AvailableLanguagesEnum } from '../translator/enums/available-languages.enum';
import { TranslatorService } from '../translator/translator.service';

export interface ContextInterface extends Context {
  languageIso: AvailableLanguagesEnum;
  translatorService: TranslatorService;
  update: any;
  scene: any;
  wizard: any;
  session: any;
  isolation?: boolean;
  message: any;
}

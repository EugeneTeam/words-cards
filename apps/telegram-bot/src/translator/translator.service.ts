import { AvailableLanguagesEnum } from './enums/available-languages.enum';

import * as RU from './translates/ru.json';
import * as UA from './translates/ua.json';

const availableTranslations: Record<string, Record<string, string>> = {
  RU,
  UA,
};

export class TranslatorService {
  private readonly currentText: Record<string, string>;

  constructor(languageIso: AvailableLanguagesEnum) {
    this.currentText = availableTranslations[languageIso.toUpperCase()];
  }

  public getTranslate<DataInterface>(
    key: string,
    data: DataInterface | object = null,
  ): string | never {
    let text: string = this.currentText[key];
    if (text) {
      text = text.replace(/\{\{(.+?)\}\}/g, (matching: string, value) =>
        data ? data[value.trim()] : '',
      );
      return text;
    } else {
      throw new Error(`Key: ${key} not found`);
    }
  }
}

import { AvailableLanguagesEnum } from './enums/available-languages.enum';

import * as RU from './translates/ru.json';
import * as UA from './translates/ua.json';

const availableTranslations: Record<string, Record<string, string>> = {
  RU,
  UA,
};

export class TranslatorService {
  private readonly language: AvailableLanguagesEnum;
  private readonly currentText: Record<string, string>;

  constructor(language: AvailableLanguagesEnum) {
    this.language = language;
    this.currentText = availableTranslations[language.toUpperCase()];
  }

  getTranslate<DataInterface>(
    key: string,
    data: DataInterface | object = {},
  ): string | never {
    let text: string = this.currentText[key];
    if (text) {
      text = text.replace(
        /\{\{(.+?)\}\}/g,
        (matching: string, value) => data[value.trim()],
      );
      return text;
    }

    return text;
  }
}

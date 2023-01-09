import { TranslatorService } from '../translator/translator.service';
import { AvailableLanguagesEnum } from '../translator/enums/available-languages.enum';

export const translateMiddleware = (context: any, next: any): any => {
  if (!context?.getTranslate && context.languageIso) {
    context.translatorService = new TranslatorService(
      AvailableLanguagesEnum[context.languageIso],
    );
  }

  return next();
};

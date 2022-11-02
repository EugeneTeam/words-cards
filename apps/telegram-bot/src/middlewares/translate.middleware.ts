import { TranslatorService } from '../languages/translator.service';
import { AvailableLanguagesEnum } from '../languages/enums/available-languages.enum';

export const translateMiddleware = (context: any, next: any): any => {
  if (!context?.getTranslate && context.language) {
    context.translatorService = new TranslatorService(
      AvailableLanguagesEnum[context.language],
    );
  }

  return next();
};

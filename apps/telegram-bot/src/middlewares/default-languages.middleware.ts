import { DEFAULT_LANGUAGE } from '../languages/constants/default-language.constant';

export const defaultLanguagesMiddleware = (context: any, next: any): any => {
  if (!context?.languageIso) {
    context.languageIso = DEFAULT_LANGUAGE;
  }

  return next();
};

import { DEFAULT_LANGUAGE } from '../languages/constants/default-language.constant';

export const defaultLanguagesMiddleware = (context: any, next: any): any => {
  if (!context?.language) {
    context.language = DEFAULT_LANGUAGE;
  }

  return next();
};

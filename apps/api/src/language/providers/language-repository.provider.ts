import { Provider } from '@nestjs/common';
import { LANGUAGE_REPOSITORY_TOKEN } from '../constants/language-repository-token.constant';
import { LanguageRepository } from '../language.repository';

export const LanguageRepositoryProvider: Provider = {
  provide: LANGUAGE_REPOSITORY_TOKEN,
  useClass: LanguageRepository,
};

import { Provider } from '@nestjs/common';
import { TRANSLATION_REPOSITORY_KEY } from '../constants/translation-repository-key.constant';
import { TranslationRepository } from '../translation.repository';

export const TranslationRepositoryProvider: Provider = {
  provide: TRANSLATION_REPOSITORY_KEY,
  useClass: TranslationRepository,
};

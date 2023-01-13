import { Provider } from '@nestjs/common';
import { WORD_REPOSITORY_KEY } from '../constants/word-repository-key.constant';
import { WordRepository } from '../word.repository';

export const WordRepositoryProvider: Provider = {
  provide: WORD_REPOSITORY_KEY,
  useClass: WordRepository,
};

import { Provider } from '@nestjs/common';
import { WORD_FILE_REPOSITORY_KEY } from '../constants/word-file-repository-key.constant';
import { WordFileRepository } from '../word-file.repository';

export const WordFileRepositoryProvider: Provider = {
  provide: WORD_FILE_REPOSITORY_KEY,
  useClass: WordFileRepository,
};

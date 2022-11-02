import { Provider } from '@nestjs/common';
import { FILE_REPOSITORY_TOKEN } from '../constants/file-repository-token.constant';
import { FileRepository } from '../file.repository';

export const FileRepositoryProvider: Provider = {
  provide: FILE_REPOSITORY_TOKEN,
  useClass: FileRepository,
};

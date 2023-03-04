import { CreateWordFileInterface } from './create-word-file.interface';

export interface WordFileRepositoryInterface<WordFile> {
  addFileToWord(data: CreateWordFileInterface): Promise<WordFile>;
}

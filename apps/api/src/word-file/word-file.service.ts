import { Inject, Injectable } from '@nestjs/common';
import { WORD_FILE_REPOSITORY_KEY } from './constants/word-file-repository-key.constant';
import { WordFileRepositoryInterface } from './interfaces/word-file-repository.interface';
import { WordFileInterface } from './interfaces/word-file.interface';
import { CreateWordFileInterface } from './interfaces/create-word-file.interface';

@Injectable()
export class WordFileService {
  constructor(
    @Inject(WORD_FILE_REPOSITORY_KEY)
    private readonly wordFileRepository: WordFileRepositoryInterface<WordFileInterface>,
  ) {}

  public async addFileToWord(
    data: CreateWordFileInterface,
  ): Promise<WordFileInterface> {
    return this.wordFileRepository.addFileToWord(data);
  }
}

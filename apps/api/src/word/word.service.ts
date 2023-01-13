import { Inject, Injectable } from '@nestjs/common';
import { WORD_REPOSITORY_KEY } from './constants/word-repository-key.constant';
import { WordRepositoryInterface } from './interfaces/word-repository.interface';
import { WordInterface } from './interfaces/word.interface';

@Injectable()
export class WordService {
  constructor(
    @Inject(WORD_REPOSITORY_KEY)
    private readonly wordRepository: WordRepositoryInterface<WordInterface>,
  ) {}

  public async createOne(data: any): Promise<WordInterface> {
    return this.wordRepository.createOne(data);
  }
}

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WordService } from './word.service';
import { StatusInterface } from '../common/interfaces/status.interface';
import { CreateWordInputDataInterface } from './interfaces/create-word-input-data.interface';
import { WordInterface } from './interfaces/word.interface';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @GrpcMethod('WordService', 'CreateOneWordInTransaction')
  async createOneWordInTransaction(
    wordData: CreateWordInputDataInterface,
  ): Promise<WordInterface> {
    return this.wordService.createOneWordInTransaction(wordData);
  }
}

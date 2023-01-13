import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WordInterface } from './interfaces/word.interface';
import { WordService } from './language.service';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @GrpcMethod('WordService', 'CreateOneWord')
  async createOne(data: any): Promise<WordInterface> {
    return this.wordService.createOne(data);
  }
}

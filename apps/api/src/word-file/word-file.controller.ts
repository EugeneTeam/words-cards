import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WordFileService } from './word-file.service';
import { CreateWordFileInterface } from './interfaces/create-word-file.interface';
import { WordFileInterface } from './interfaces/word-file.interface';

@Controller('word')
export class WordFileController {
  constructor(private readonly wordFileService: WordFileService) {}

  @GrpcMethod('WordFileService', 'AddFileToWord')
  async addFileToWord(
    data: CreateWordFileInterface,
  ): Promise<WordFileInterface> {
    return this.wordFileService.addFileToWord(data);
  }
}

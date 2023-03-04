import { Module } from '@nestjs/common';
import { WordFileService } from './word-file.service';
import { WordFileRepository } from './word-file.repository';
import { WordFileRepositoryProvider } from './providers/word-file-repository.provider';
import { WordFileController } from './word-file.controller';

@Module({
  providers: [WordFileRepository, WordFileService, WordFileRepositoryProvider],
  controllers: [WordFileController],
})
export class WordFileModule {}

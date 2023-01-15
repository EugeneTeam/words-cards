import { Module } from '@nestjs/common';
import { WordRepository } from './word.repository';
import { WordService } from './word.service';
import { WordRepositoryProvider } from './providers/word-repository.provider';
import { TranslationModule } from '../translation/translation.module';
import { WordController } from './word.controller';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [TranslationModule, ConfigurationModule],
  providers: [WordRepository, WordService, WordRepositoryProvider],
  controllers: [WordController],
})
export class WordModule {}

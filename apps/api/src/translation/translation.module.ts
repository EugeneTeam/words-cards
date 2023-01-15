import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationRepository } from './translation.repository';
import { TranslationRepositoryProvider } from './providers/translation-repository.provider';

@Module({
  providers: [
    TranslationService,
    TranslationRepository,
    TranslationRepositoryProvider,
  ],
  exports: [TranslationService],
})
export class TranslationModule {}

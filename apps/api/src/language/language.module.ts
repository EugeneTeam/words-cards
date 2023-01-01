import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageRepositoryProvider } from './providers/language-repository.provider';

@Module({
  providers: [LanguageService, LanguageRepositoryProvider],
  exports: [LanguageService],
})
export class LanguageModule {}

import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageRepositoryProvider } from './providers/language-repository.provider';
import { LanguageController } from './language.controller';

@Module({
  providers: [LanguageService, LanguageRepositoryProvider],
  controllers: [LanguageController],
  exports: [LanguageService],
})
export class LanguageModule {}

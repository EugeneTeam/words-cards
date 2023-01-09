import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LanguageService } from './language.service';
import { LanguagesInterface } from './interfaces/languages.interface';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @GrpcMethod('LanguageService', 'FindAllLanguages')
  async findAllLanguages(empty: any): Promise<LanguagesInterface> {
    return this.languageService.findAllLanguages(empty);
  }
}

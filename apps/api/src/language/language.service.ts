import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY_TOKEN } from './constants/language-repository-token.constant';
import { LanguageRepositoryInterface } from './interfaces/language-repository.interface';
import { LanguageInterface } from './interfaces/language.interface';
import { LanguagesInterface } from './interfaces/languages.interface';

@Injectable()
export class LanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY_TOKEN)
    private readonly languageRepository: LanguageRepositoryInterface<LanguageInterface>,
  ) {}

  public async getOneByIso(iso: string): Promise<LanguageInterface> {
    return this.languageRepository.getOneByIso(iso);
  }
  public async findAllLanguages(empty: any): Promise<LanguagesInterface> {
    return this.languageRepository.findAllLanguages(empty);
  }
}

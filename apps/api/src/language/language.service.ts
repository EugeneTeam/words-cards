import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY_TOKEN } from './constants/language-repository-token.constant';
import { LanguageRepositoryInterface } from './interfaces/language-repository.interface';
import { LanguageInterface } from './interfaces/language.interface';

@Injectable()
export class LanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY_TOKEN)
    private readonly languageRepository: LanguageRepositoryInterface<LanguageInterface>,
  ) {}

  public getOneByIso(iso: string): Promise<LanguageInterface> {
    return this.languageRepository.getOneByIso(iso);
  }
}

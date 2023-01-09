import { LanguagesInterface } from './languages.interface';

export interface LanguageRepositoryInterface<Language> {
  getOneByIso(iso: string): Promise<Language>;
  findAllLanguages(empty: any): Promise<LanguagesInterface>;
}

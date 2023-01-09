import { Observable } from 'rxjs';
import { LanguagesInterface } from './languages.interface';

export interface LanguageRepositoryInterface<Language> {
  getOneByIso(iso: string): Observable<Language>;
  findAllLanguages(empty: any): Observable<LanguagesInterface>;
}

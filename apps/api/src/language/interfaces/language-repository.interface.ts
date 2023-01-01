export interface LanguageRepositoryInterface<Language> {
  getOneByIso(iso: string): Promise<Language>;
}

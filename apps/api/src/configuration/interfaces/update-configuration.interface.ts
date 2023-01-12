export interface UpdateConfigurationInterface {
  readonly userUuid: string;
  readonly defaultLanguageForNewWord?: number;
  readonly defaultLanguageForWordTranslation?: number;
  readonly useDefaultLanguage?: boolean;
}

export interface ConfigurationInterface {
  readonly uuid: string;
  readonly userUuid: string;
  readonly defaultLanguageForNewWord: number;
  readonly defaultLanguageForWordTranslation: number;
  readonly isNull?: boolean;
}

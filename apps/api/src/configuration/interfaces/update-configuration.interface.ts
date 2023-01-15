import { DefaultLanguageInterface } from '../../common/interfaces/default-language.interface';

export interface UpdateConfigurationInterface {
  readonly userUuid: string;
  readonly defaultLanguageForNewWord?: DefaultLanguageInterface;
  readonly defaultLanguageForWordTranslation?: DefaultLanguageInterface;
  readonly useDefaultLanguage?: boolean;
}

import { DefaultLanguageInterface } from '../../common/interfaces/default-language.interface';

export interface CreateConfigurationInterface {
  readonly userUuid: string;
  readonly defaultLanguageForNewWord: DefaultLanguageInterface;
  readonly defaultLanguageForWordTranslation: DefaultLanguageInterface;
  readonly useDefaultLanguage?: boolean;
}

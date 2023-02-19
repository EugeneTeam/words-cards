import { DefaultLanguageInterface } from '../../common/interfaces/default-language.interface';

export interface ConfigurationInterface {
  readonly uuid: string;
  readonly userUuid: string;
  readonly defaultLanguageForNewWord: DefaultLanguageInterface;
  readonly defaultLanguageForWordTranslation: DefaultLanguageInterface;
  readonly isNull?: boolean;
}

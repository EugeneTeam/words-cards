import { TranslationsListInterface } from './translations-list.interface';
import { CreateWordTruncatedDataInterface } from './create-word-truncated-data.interface';

export interface CreateWordInputDataInterface {
  readonly word: CreateWordTruncatedDataInterface;
  readonly userUuid: string;
  readonly translations: TranslationsListInterface;
}

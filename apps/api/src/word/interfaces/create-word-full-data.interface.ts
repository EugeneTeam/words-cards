export interface CreateWordFullDataInterface {
  readonly word: string;
  readonly note?: string;
  readonly originalLanguageUuid: string;
  readonly categoryUuid?: string;
  readonly userUuid: string;
}

import { ContentTypeEnum } from '../enums/content-type.enum';

export interface AddFileInterface {
  readonly token: string;
  readonly userUuid: string;
  readonly type: ContentTypeEnum;
}

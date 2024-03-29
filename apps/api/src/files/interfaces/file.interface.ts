import { ContentTypeEnum } from '../enums/content-type.enum';

export interface FileInterface {
  readonly uuid: string;
  readonly userUuid: string;
  readonly fileToken: string;
  readonly type: ContentTypeEnum;
}

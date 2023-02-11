import { ContentTypeEnum } from '../enums/content-type.enum';

export interface FileInterface {
  readonly uuid: string;
  readonly userUuid: string;
  readonly token: string;
  readonly type: ContentTypeEnum;
}

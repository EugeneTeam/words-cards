import { ContentTypeEnum } from '../enums/content-type.enum';

export interface UploadFileResponseInterface {
  readonly status: boolean;
  readonly message: string | null;
  readonly mediaType: ContentTypeEnum;
  readonly token: string | null;
  readonly uuid: string | null;
}

import { ContentTypeEnum } from '../enums/content-type.enum';
import { ContentDataInterface } from './content-data.interface';

export interface ContentResponseInterface {
  type: ContentTypeEnum;
  data: ContentDataInterface;
}

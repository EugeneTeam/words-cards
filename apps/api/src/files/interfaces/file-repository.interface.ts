import { AddFileInterface } from './add-file.interface';
import { StatusInterface } from '../../common/interfaces/status.interface';
import { TokenInterface } from './token.interface';

export interface FileRepositoryInterface<File> {
  addOne(data: AddFileInterface): Promise<File>;
  removeFileByToken(data: TokenInterface): Promise<StatusInterface>;
}

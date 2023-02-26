import { Observable } from 'rxjs';
import { AddFileInterface } from './add-file.interface';
import { TokenInterface } from './token.interface';
import { StatusInterface } from '../../common/interfaces/status.interface';

export interface FileRepositoryInterface<File> {
  addFile(data: AddFileInterface): Observable<File>;
  removeFileByToken(data: TokenInterface): Observable<StatusInterface>;
}

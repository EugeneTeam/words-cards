import { Observable } from 'rxjs';
import { AddFileInterface } from './add-file.interface';

export interface FileRepositoryInterface<File> {
  addFile(data: AddFileInterface): Observable<File>;
}

import { CreateWordFileInterface } from './create-word-file.interface';
import { Observable } from 'rxjs';

export interface WordFileRepositoryInterface<WordFile> {
  addFileToWord(data: CreateWordFileInterface): Observable<WordFile>;
}

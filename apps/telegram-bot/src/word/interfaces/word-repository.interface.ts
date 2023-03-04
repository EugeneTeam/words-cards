import { CreateWordInputDataInterface } from './create-word-input-data.interface';
import { Observable } from 'rxjs';
import { StatusInterface } from '../../common/interfaces/status.interface';
import { WordInterface } from './word.interface';

export interface WordRepositoryInterface<Word> {
  createOneWordInTransaction(
    data: CreateWordInputDataInterface,
  ): Observable<WordInterface>;
}

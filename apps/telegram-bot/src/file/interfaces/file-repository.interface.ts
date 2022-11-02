import { Observable } from 'rxjs';

export interface FileRepositoryInterface<File> {
  getOneByName(name: string): Observable<File>;
  updateOneByName(name: string, fileToken: string): Observable<File>;
  addOne(name: string, fileToken: string): Observable<File>;
}

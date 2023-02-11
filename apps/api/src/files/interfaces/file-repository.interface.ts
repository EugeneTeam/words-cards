import { AddFileInterface } from './add-file.interface';

export interface FileRepositoryInterface<File> {
  addOne(data: AddFileInterface): Promise<File>;
}

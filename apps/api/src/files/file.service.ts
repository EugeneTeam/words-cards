import { Inject, Injectable } from '@nestjs/common';
import { FILE_REPOSITORY_TOKEN } from './constants/file-repository-token.constant';
import { FileRepositoryInterface } from './interfaces/file-repository.interface';
import { FileInterface } from './interfaces/file.interface';
import { AddFileInterface } from './interfaces/add-file.interface';
import { StatusInterface } from '../common/interfaces/status.interface';
import { TokenInterface } from './interfaces/token.interface';

@Injectable()
export class FileService {
  constructor(
    @Inject(FILE_REPOSITORY_TOKEN)
    private readonly fileRepository: FileRepositoryInterface<FileInterface>,
  ) {}

  public async addOne(data: AddFileInterface): Promise<FileInterface> {
    return this.fileRepository.addOne(data);
  }

  public async removeFileByToken(
    data: TokenInterface,
  ): Promise<StatusInterface> {
    return this.fileRepository.removeFileByToken(data);
  }
}

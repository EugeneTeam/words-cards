import { Inject, Injectable } from '@nestjs/common';
import { FILE_REPOSITORY_TOKEN } from './constants/file-repository-token.constant';
import { FileRepositoryInterface } from './interfaces/file-repository.interface';
import { FileInterface } from './interfaces/file.interface';

@Injectable()
export class FileService {
  constructor(
    @Inject(FILE_REPOSITORY_TOKEN)
    private readonly fileRepository: FileRepositoryInterface<FileInterface>,
  ) {}

  public async getOneByName(name: string): Promise<FileInterface> {
    return this.fileRepository.getOneByName(name);
  }

  public async updateOneByName(
    name: string,
    fileToken: string,
  ): Promise<FileInterface> {
    return this.fileRepository.updateOneByName(name, fileToken);
  }

  public async addOne(name: string, fileToken: string): Promise<FileInterface> {
    return this.fileRepository.addOne(name, fileToken);
  }
}

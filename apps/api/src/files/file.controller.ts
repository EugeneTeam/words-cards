import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FileService } from './file.service';
import { FileInterface } from './interfaces/file.interface';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @GrpcMethod('FileService', 'GetOneByName')
  async getOneByName(name: string): Promise<FileInterface> {
    return this.fileService.getOneByName(name);
  }

  @GrpcMethod('FileService', 'UpdateOneByName')
  async updateOneByName(
    name: string,
    fileToken: string,
  ): Promise<FileInterface> {
    return this.fileService.updateOneByName(name, fileToken);
  }

  @GrpcMethod('FileService', 'AddOne')
  async addOne(name: string, fileToken: string): Promise<FileInterface> {
    return this.fileService.addOne(name, fileToken);
  }
}

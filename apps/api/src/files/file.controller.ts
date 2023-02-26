import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FileService } from './file.service';
import { FileInterface } from './interfaces/file.interface';
import { AddFileInterface } from './interfaces/add-file.interface';
import { TokenInterface } from './interfaces/token.interface';
import { StatusInterface } from '../common/interfaces/status.interface';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @GrpcMethod('FileService', 'AddFile')
  async addOne(data: AddFileInterface): Promise<FileInterface> {
    return this.fileService.addOne(data);
  }

  @GrpcMethod('FileService', 'RemoveFileByToken')
  async removeFileByToken(data: TokenInterface): Promise<StatusInterface> {
    return this.fileService.removeFileByToken(data);
  }
}

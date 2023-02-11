import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FileService } from './file.service';
import { FileInterface } from './interfaces/file.interface';
import { AddFileInterface } from './interfaces/add-file.interface';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @GrpcMethod('FileService', 'AddFile')
  async addOne(data: AddFileInterface): Promise<FileInterface> {
    return this.fileService.addOne(data);
  }
}

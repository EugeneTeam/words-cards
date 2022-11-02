import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileRepositoryProvider } from './providers/file-repository.provider';

@Module({
  providers: [FileService, FileRepository, FileRepositoryProvider],
  controllers: [FileController],
})
export class FileModule {}

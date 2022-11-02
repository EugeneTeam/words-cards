import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

import { PACKAGE_NAME } from '../config/grpc/grpc.constants';
import { FileRepositoryInterface } from './interfaces/file-repository.interface';
import { FileInterface } from './interfaces/file.interface';
import { getDataFromObservableUtil } from '../utils/get-data-from-observable.util';

@Injectable()
export class FileService implements OnModuleInit {
  private fileService: FileRepositoryInterface<FileInterface>;

  constructor(@Inject(PACKAGE_NAME) private readonly client: ClientGrpc) {}

  public onModuleInit(): void {
    this.fileService =
      this.client.getService<FileRepositoryInterface<FileInterface>>(
        'UserService',
      );
  }

  public async getOneByName(name: string): Promise<FileInterface> {
    const observable: Observable<FileInterface> =
      await this.fileService.getOneByName(name);
    return getDataFromObservableUtil<FileInterface>(observable);
  }

  public async updateOneByName(
    name: string,
    fileToken: string,
  ): Promise<FileInterface> {
    const observable: Observable<FileInterface> =
      await this.fileService.updateOneByName(name, fileToken);
    return getDataFromObservableUtil<FileInterface>(observable);
  }

  public async addOne(name: string, fileToken: string): Promise<FileInterface> {
    const observable: Observable<FileInterface> = await this.fileService.addOne(
      name,
      fileToken,
    );
    return getDataFromObservableUtil<FileInterface>(observable);
  }
}

// await this.bot.telegram.sendPhoto(
//   TelegrafContext.getTelegramId(context),
//   'AgACAgIAAxkDAAKqKmNibvP4JOJ6dRmnOO9MZrfvO8QSAALawTEbkLwQSyHEogIYI0ooAQADAgADcwADKgQ',
// );

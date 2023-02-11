import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

import { PACKAGE_NAME } from '../config/grpc/grpc.constants';
import { FileRepositoryInterface } from './interfaces/file-repository.interface';
import { FileInterface } from './interfaces/file.interface';
import { getDataFromObservableUtil } from '../utils/get-data-from-observable.util';
import { ContextInterface } from '../interfaces/context.interface';
import { AppService } from '../app.service';
import { createWriteStream, WriteStream } from 'fs';
import { HttpService } from '@nestjs/axios';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import { AxiosResponse } from 'axios';
import { ContentResponseInterface } from './interfaces/content-response.interface';
import { ContentTypeEnum } from './enums/content-type.enum';
import { AddFileInterface } from './interfaces/add-file.interface';

@Injectable()
export class FileService implements OnModuleInit {
  private fileService: FileRepositoryInterface<FileInterface>;

  constructor(
    @Inject(PACKAGE_NAME) private readonly client: ClientGrpc,
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  public onModuleInit(): void {
    this.fileService =
      this.client.getService<FileRepositoryInterface<FileInterface>>(
        'FileService',
      );
  }

  public async getFileFromTelegrafContext(context: ContextInterface) {
    return new Promise(async (resolve, reject) => {
      const content: ContentResponseInterface =
        this.defineContentTypeByContext(context);

      if (content) {
        const url: URL = await this.appService.downloadFileByFileId(
          content.data.file_id,
        );
        const token: string = this.generateFileNameByContentType(content);
        const path: string = this.getPathByContentType(content.type);
        const stream: WriteStream = createWriteStream(`${path}/${token}`);

        const response: AxiosResponse<any, any> = await lastValueFrom(
          this.httpService.get(url.href, {
            method: 'GET',
            responseType: 'stream',
          }),
        );

        response.data.pipe(stream);

        stream.on('finish', async () => {
          await this.addFile({
            token: token,
            type: content.type,
            userUuid: context.session.userUuid,
          });
          resolve(true);
        });
        stream.on('error', reject);
      }
    });
  }

  public async addFile(data: AddFileInterface): Promise<FileInterface> {
    const observable: Observable<FileInterface> =
      await this.fileService.addFile(data);
    return getDataFromObservableUtil<FileInterface>(observable);
  }

  private defineContentTypeByContext(
    context: ContextInterface,
  ): ContentResponseInterface {
    console.log(context.update.message);
    /**
     * The picture can be obtained in 4 different sizes
     * Max index 3
     * Min index 0
     */
    const IMAGE_SIZE_INDEX = 2;

    let type: ContentTypeEnum = ContentTypeEnum.unknown;

    const photo = context.update.message?.photo?.[IMAGE_SIZE_INDEX];
    if (photo) {
      type = ContentTypeEnum.image;
    }

    const audio =
      context.update.message?.audio || context.update.message?.voice;
    if (audio) {
      type = ContentTypeEnum.audio;
    }

    const video = context.update.message?.video;
    if (video) {
      type = ContentTypeEnum.video;
    }

    return {
      type,
      data: photo || audio || video || null,
    };
  }
  private generateFileNameByContentType(
    content: ContentResponseInterface,
  ): string | null {
    const splitFilename = content?.data?.file_name?.split('.');
    if (splitFilename?.length) {
      return `${uuid()}${Date.now()}.${splitFilename.pop()}`;
    }

    if (content.type === ContentTypeEnum.image) {
      /**
       * Image upload response does not have filename field
       */
      return `${uuid()}${Date.now()}.jpg`;
    }

    if (content.type === ContentTypeEnum.audio) {
      /**
       * An audio file without a filename is a voice message
       */
      return `${uuid()}${Date.now()}.aac`;
    }
    return null;
  }

  private getPathByContentType(type: ContentTypeEnum): string {
    let lastFolderName: string;
    if (type === ContentTypeEnum.video) {
      lastFolderName = 'video';
    }
    if (type === ContentTypeEnum.audio) {
      lastFolderName = 'audio';
    }
    if (type === ContentTypeEnum.image) {
      lastFolderName = 'images';
    }

    return path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      'files',
      lastFolderName,
    );
  }
}

// TODO
// await this.bot.telegram.sendPhoto(
//   TelegrafContext.getTelegramId(context),
//   'AgACAgIAAxkDAAKqKmNibvP4JOJ6dRmnOO9MZrfvO8QSAALawTEbkLwQSyHEogIYI0ooAQADAgADcwADKgQ',
// );

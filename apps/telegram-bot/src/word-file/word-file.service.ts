import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { getDataFromObservableUtil } from '../utils/get-data-from-observable.util';
import { PACKAGE_NAME } from '../config/grpc/grpc.constants';
import { CacheWrapperUtil } from '../utils/cache-wrapper.util';
import { WordFileRepositoryInterface } from './interfaces/word-file-repository.interface';
import { WordFileInterface } from './interfaces/word-file.interface';

@Injectable()
export class WordFileService extends CacheWrapperUtil implements OnModuleInit {
  private wordFileService: WordFileRepositoryInterface<WordFileInterface>;

  constructor(@Inject(PACKAGE_NAME) private readonly client: ClientGrpc) {
    super();
  }

  public onModuleInit(): void {
    this.wordFileService =
      this.client.getService<WordFileRepositoryInterface<WordFileInterface>>(
        'WordFileService',
      );
  }

  public async addFileToWord(
    wordUuid: string,
    fileUuid: string,
  ): Promise<WordFileInterface> {
    const observable: Observable<WordFileInterface> =
      await this.wordFileService.addFileToWord({
        wordUuid,
        fileUuid,
      });
    return getDataFromObservableUtil<WordFileInterface>(observable);
  }
}

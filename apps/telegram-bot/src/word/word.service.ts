import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { getDataFromObservableUtil } from '../utils/get-data-from-observable.util';
import { PACKAGE_NAME } from '../config/grpc/grpc.constants';
import { WordRepositoryInterface } from './interfaces/word-repository.interface';
import { WordInterface } from './interfaces/word.interface';
import { StatusInterface } from '../common/interfaces/status.interface';
import { CreateWordInputDataInterface } from './interfaces/create-word-input-data.interface';

@Injectable()
export class WordService implements OnModuleInit {
  private wordService: WordRepositoryInterface<WordInterface>;

  constructor(@Inject(PACKAGE_NAME) private readonly client: ClientGrpc) {}

  public onModuleInit(): void {
    this.wordService =
      this.client.getService<WordRepositoryInterface<WordInterface>>(
        'WordService',
      );
  }

  public async create(
    data: CreateWordInputDataInterface,
  ): Promise<WordInterface> {
    const observable: Observable<WordInterface> =
      await this.wordService.createOneWordInTransaction(data);
    return getDataFromObservableUtil<WordInterface>(observable);
  }
}

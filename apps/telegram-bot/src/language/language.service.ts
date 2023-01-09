import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { getDataFromObservableUtil } from '../utils/get-data-from-observable.util';
import { PACKAGE_NAME } from '../config/grpc/grpc.constants';
import { LanguageRepositoryInterface } from './interfaces/language-repository.interface';
import { LanguageInterface } from './interfaces/language.interface';
import { LanguagesInterface } from './interfaces/languages.interface';

@Injectable()
export class LanguageService implements OnModuleInit {
  private languageService: LanguageRepositoryInterface<LanguageInterface>;

  constructor(@Inject(PACKAGE_NAME) private readonly client: ClientGrpc) {}

  public onModuleInit(): void {
    this.languageService =
      this.client.getService<LanguageRepositoryInterface<LanguageInterface>>(
        'LanguageService',
      );
  }

  public async findAllLanguages(): Promise<LanguagesInterface> {
    const observable: Observable<LanguagesInterface> =
      await this.languageService.findAllLanguages({});
    return getDataFromObservableUtil<LanguagesInterface>(observable);
  }
}

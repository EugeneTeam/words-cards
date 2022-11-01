import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { getDataFromObservableUtil } from '../utils/get-data-from-observable.util';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { InsertUserInterface } from './interfaces/insert-user.interface';
import { PACKAGE_NAME } from '../config/grpc/grpc.constants';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserRepositoryInterface<UserInterface>;

  constructor(@Inject(PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.userService =
      this.client.getService<UserRepositoryInterface<UserInterface>>(
        'UserService',
      );
  }

  async insertOne(data: InsertUserInterface): Promise<UserInterface> {
    const observable: Observable<UserInterface> =
      await this.userService.insertOne(data);
    return getDataFromObservableUtil(observable);
  }
}

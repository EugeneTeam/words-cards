import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { UserService } from './user.service';
import { InsertUserInterface } from './interfaces/insert-user.interface';
import { UserInterface } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'InsertOne')
  async insertOne(data: InsertUserInterface): Promise<UserInterface> {
    return this.userService.insertOne(data);
  }
}

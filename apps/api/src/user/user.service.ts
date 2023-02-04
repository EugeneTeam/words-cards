import { Inject, Injectable } from '@nestjs/common';

import { USER_REPOSITORY_TOKEN } from './constants/user-repository-token.constant';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { UserInterface } from './interfaces/user.interface';
import { InsertUserInterface } from './interfaces/insert-user.interface';
import { LanguageService } from '../language/language.service';
import { LanguageInterface } from '../language/interfaces/language.interface';
import { TelegramIdInterface } from '../../../../common/interfaces/telegramId.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface<UserInterface>,
    private readonly languageService: LanguageService,
  ) {}

  public async findUserByTelegramId(
    data: TelegramIdInterface,
  ): Promise<UserInterface> {
    return this.userRepository.findUserByTelegramId(data);
  }

  async insertOne(data: InsertUserInterface): Promise<UserInterface> {
    const language: LanguageInterface = await this.languageService.getOneByIso(
      'RU',
    );
    if (language) {
      data.languageUuid = language.uuid;
    }

    return this.userRepository.insertOne(data);
  }
}

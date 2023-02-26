import { Injectable } from '@nestjs/common';
import { FileRepositoryInterface } from './interfaces/file-repository.interface';
import { FileInterface } from './interfaces/file.interface';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { AddFileInterface } from './interfaces/add-file.interface';
import { ContentTypeEnum } from './enums/content-type.enum';
import { TokenInterface } from './interfaces/token.interface';
import { StatusInterface } from '../common/interfaces/status.interface';

/**
 * Enumeration on the TS is implemented in the form of dictionaries, meanwhile,
 * gRPC does not allow the use of a string literal in the definition of enumerations,
 * the enumeration comes from the microservice in the form of an integer value.
 * Therefore, it is necessary to associate the value of the gRPC enumeration and the dictionary in TS.
 */
const AssociatedListOfFileTypes: string[] = [
  'video',
  'audio',
  'image',
  'document',
  'voice',
  'unknown',
];

@Injectable()
export class FileRepository implements FileRepositoryInterface<FileInterface> {
  constructor(@InjectModel() private readonly knex: Knex) {}

  public async addOne(data: AddFileInterface): Promise<FileInterface> {
    const newFile = await this.knex<FileInterface>(TABLES.FILES)
      .insert({
        ...data,
        type: ContentTypeEnum[AssociatedListOfFileTypes[data.type]],
      })
      .returning('*');
    return newFile[0];
  }

  public async removeFileByToken(
    data: TokenInterface,
  ): Promise<StatusInterface> {
    await this.knex(TABLES.FILES).del().where('token', data.token);
    return {
      status: true,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { FileRepositoryInterface } from './interfaces/file-repository.interface';
import { FileInterface } from './interfaces/file.interface';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class FileRepository implements FileRepositoryInterface<FileInterface> {
  constructor(@InjectModel() private readonly knex: Knex) {}

  public async getOneByName(name: string): Promise<FileInterface> {
    return this.knex<FileInterface>('files')
      .select()
      .where({
        name,
      })
      .first();
  }

  public async updateOneByName(
    name: string,
    fileToken: string,
  ): Promise<FileInterface> {
    await this.knex<FileInterface>('files')
      .update({
        fileToken,
      })
      .where({ name });

    return this.getOneByName(name);
  }

  public async addOne(name: string, fileToken: string): Promise<FileInterface> {
    return this.knex<FileInterface>('files').insert({
      name,
      fileToken,
    });
  }
}

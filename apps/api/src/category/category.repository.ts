import { Injectable } from '@nestjs/common';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { CategoryInterface } from './interfaces/category.interface';

@Injectable()
export class CategoryRepository
  implements CategoryRepositoryInterface<CategoryInterface>
{
  constructor(@InjectModel() private readonly knex: Knex<CategoryInterface>) {}

  public async createOneCategory(data: any): Promise<CategoryInterface> {
    const result = await this.knex<CategoryInterface>(TABLES.CATEGORY).insert(
      data,
      '*',
    );
    return result[0];
  }
}

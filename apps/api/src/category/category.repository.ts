import { Injectable } from '@nestjs/common';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { CategoryInterface } from './interfaces/category.interface';
import { AddCategoryInterface } from './interfaces/add-category.interface';

@Injectable()
export class CategoryRepository
  implements CategoryRepositoryInterface<CategoryInterface>
{
  constructor(@InjectModel() private readonly knex: Knex<CategoryInterface>) {}

  public async createCategories(
    data: AddCategoryInterface,
  ): Promise<CategoryInterface[]> {
    const normalizedList = data.categories.map((category) => {
      return {
        name: category,
        userUuid: data.userUuid,
      };
    });

    return this.knex<CategoryInterface>(TABLES.CATEGORY)
      .insert(normalizedList)
      .onConflict(['userUuid', 'name'])
      .ignore()
      .returning('*');
  }
}

import { Injectable } from '@nestjs/common';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { TABLES } from '../../../../common/constants/tables-names.constant';
import { CategoryInterface } from './interfaces/category.interface';
import { AddCategoryInterface } from './interfaces/add-category.interface';
import { PaginationInterface } from '../../../../common/interfaces/pagination.interface';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '../../../../common/constants/pagination-default.constant';
import { RowsAndCountInterface } from '../../../../common/interfaces/rows-and-count.interface';

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

  public async findAllCategoriesAndCountByUserUuid(
    userUuid: string,
    pagination: PaginationInterface | null = null,
  ): Promise<RowsAndCountInterface<CategoryInterface>> {
    const limit: number = pagination?.limit ? pagination.limit : DEFAULT_LIMIT;
    const offset: number = pagination?.offset
      ? pagination.offset
      : DEFAULT_OFFSET;

    const rows: CategoryInterface[] = await this.knex<CategoryInterface>(
      TABLES.CATEGORY,
    )
      .where('userUuid', userUuid)
      .limit(limit)
      .offset(offset);

    const count = await this.knex<CategoryInterface>(TABLES.CATEGORY)
      .where('userUuid', userUuid)
      .count();

    return {
      rows,
      count: Number(count),
    };
  }
}

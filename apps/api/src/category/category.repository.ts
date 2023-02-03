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
import { UuidInterface } from '../../../../common/interfaces/uuid.interface';
import { WordInterface } from '../word/interfaces/word.interface';
import { CategoryInfoInterface } from './interfaces/category-info.interface';

@Injectable()
export class CategoryRepository
  implements CategoryRepositoryInterface<CategoryInterface>
{
  constructor(@InjectModel() private readonly knex: Knex<CategoryInterface>) {}

  public async findCategoryInfoByUuid(
    data: UuidInterface,
  ): Promise<CategoryInfoInterface> {
    console.log();
    console.log();
    console.log();
    console.log(data);
    const category: CategoryInterface = await this.knex(TABLES.CATEGORY)
      .where({ uuid: data.uuid })
      .first();

    const wordsCount: number = await this.knex<WordInterface>(TABLES.WORDS)
      .where({
        categoryUuid: category.uuid,
      })
      .count();

    console.log({
      category,
      wordsInCategory: wordsCount[0].count,
    });
    return {
      category,
      wordsInCategory: wordsCount[0].count,
    };
  }

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
    console.log(1);
    const limit: number = pagination?.limit ? pagination.limit : DEFAULT_LIMIT;
    console.log(2);
    const offset: number = pagination?.offset
      ? pagination.offset
      : DEFAULT_OFFSET;
    console.log(3);
    const rows: CategoryInterface[] = await this.knex<CategoryInterface>(
      TABLES.CATEGORY,
    )
      .where('userUuid', userUuid)
      .limit(limit)
      .offset(offset);
    console.log(4);
    const count = await this.knex<CategoryInterface>(TABLES.CATEGORY)
      .where('userUuid', userUuid)
      .count();
    console.log(5);
    return {
      rows,
      count: Number(count),
    };
  }
}

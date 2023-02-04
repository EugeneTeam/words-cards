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
import { StatusInterface } from '../common/interfaces/status.interface';
import Transaction = Knex.Transaction;
import { UpdateCategoryInterface } from './interfaces/update-category.interface';

@Injectable()
export class CategoryRepository
  implements CategoryRepositoryInterface<CategoryInterface>
{
  constructor(@InjectModel() private readonly knex: Knex<CategoryInterface>) {}

  public async updateCategory(
    data: UpdateCategoryInterface,
  ): Promise<StatusInterface> {
    await this.knex(TABLES.CATEGORY)
      .where('uuid', data.uuid)
      .update({ name: data.name });

    return {
      status: true,
    };
  }
  public async removeCategoryByUuid(
    data: UuidInterface,
  ): Promise<StatusInterface> {
    return this.knex.transaction(async (transaction: Transaction) => {
      await this.knex<WordInterface>(TABLES.WORDS)
        .where('categoryUuid', data.uuid)
        .transacting(transaction)
        .update({ categoryUuid: null });

      await this.knex(TABLES.CATEGORY)
        .transacting(transaction)
        .del()
        .where('uuid', data.uuid);

      return {
        status: true,
      };
    });
  }

  public async findCategoryInfoByUuid(
    data: UuidInterface,
  ): Promise<CategoryInfoInterface> {
    const category: CategoryInterface = await this.knex(TABLES.CATEGORY)
      .where({ uuid: data.uuid })
      .first();

    const wordsCount: number = await this.knex<WordInterface>(TABLES.WORDS)
      .where({
        categoryUuid: category.uuid,
      })
      .count();

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
      count: Number(count[0].count),
      currentPage: offset / limit + 1,
      maxPage: Math.ceil(Number(count[0].count) / limit),
    };
  }
}

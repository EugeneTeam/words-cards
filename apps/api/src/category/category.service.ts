import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY_TOKEN } from './constants/category-repository-token.constant';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';
import { CategoryInterface } from './interfaces/category.interface';
import { AddCategoryInterface } from './interfaces/add-category.interface';
import { AddCategoriesResponseInterface } from './interfaces/add-categories-response.interface';
import { PaginationInterface } from '../../../../common/interfaces/pagination.interface';
import { RowsAndCountInterface } from '../../../../common/interfaces/rows-and-count.interface';
import { UuidInterface } from '../../../../common/interfaces/uuid.interface';
import { CategoryInfoInterface } from './interfaces/category-info.interface';
import { StatusInterface } from '../common/interfaces/status.interface';
import { UpdateCategoryInterface } from './interfaces/update-category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: CategoryRepositoryInterface<CategoryInterface>,
  ) {}

  public async updateCategory(
    data: UpdateCategoryInterface,
  ): Promise<StatusInterface> {
    return this.categoryRepository.updateCategory(data);
  }

  public async removeCategoryByUuid(
    data: UuidInterface,
  ): Promise<StatusInterface> {
    return this.categoryRepository.removeCategoryByUuid(data);
  }

  public async findCategoryInfoByUuid(
    data: UuidInterface,
  ): Promise<CategoryInfoInterface> {
    return this.categoryRepository.findCategoryInfoByUuid(data);
  }

  public async createCategories(
    data: AddCategoryInterface,
  ): Promise<AddCategoriesResponseInterface> {
    const newCategories: CategoryInterface[] =
      await this.categoryRepository.createCategories(data);
    const addedCategories: string[] = [];
    const skippedCategories: string[] = [];

    data.categories.forEach((category: string) => {
      if (
        newCategories.find(
          (newCategory: CategoryInterface) => category === newCategory.name,
        )
      ) {
        addedCategories.push(category);
      } else {
        skippedCategories.push(category);
      }
    });

    return {
      addedCategories,
      skippedCategories,
    };
  }

  public async findAllCategoriesAndCountByUserUuid(
    userUuid: string,
    pagination?: PaginationInterface,
  ): Promise<RowsAndCountInterface<CategoryInterface>> {
    return this.categoryRepository.findAllCategoriesAndCountByUserUuid(
      userUuid,
      pagination,
    );
  }
}

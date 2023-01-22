import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY_TOKEN } from './constants/category-repository-token.constant';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';
import { CategoryInterface } from './interfaces/category.interface';
import { AddCategoryInterface } from './interfaces/add-category.interface';
import { AddCategoriesResponseInterface } from './interfaces/add-categories-response.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: CategoryRepositoryInterface<CategoryInterface>,
  ) {}

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
}

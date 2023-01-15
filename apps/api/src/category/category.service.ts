import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY_TOKEN } from './constants/category-repository-token.constant';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';
import { CategoryInterface } from './interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY_TOKEN)
    private readonly categoryRepository: CategoryRepositoryInterface<CategoryInterface>,
  ) {}

  // TODO any
  public async createOneCategory(data: any): Promise<CategoryInterface> {
    return this.categoryRepository.createOneCategory(data);
  }
}

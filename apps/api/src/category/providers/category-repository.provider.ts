import { Provider } from '@nestjs/common';
import { CATEGORY_REPOSITORY_TOKEN } from '../constants/category-repository-token.constant';
import { CategoryRepository } from '../category.repository';

export const CategoryRepositoryProvider: Provider = {
  provide: CATEGORY_REPOSITORY_TOKEN,
  useClass: CategoryRepository,
};

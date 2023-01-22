import { AddCategoryInterface } from './add-category.interface';

export interface CategoryRepositoryInterface<Category> {
  createCategories(data: AddCategoryInterface): Promise<Category[]>;
}

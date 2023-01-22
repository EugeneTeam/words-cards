import { AddCategoryInterface } from './add-category.interface';
import { PaginationInterface } from '../../../../../common/interfaces/pagination.interface';
import { RowsAndCountInterface } from '../../../../../common/interfaces/rows-and-count.interface';

export interface CategoryRepositoryInterface<Category> {
  createCategories(data: AddCategoryInterface): Promise<Category[]>;
  findAllCategoriesAndCountByUserUuid(
    userUuid: string,
    pagination?: PaginationInterface,
  ): Promise<RowsAndCountInterface<Category>>;
}

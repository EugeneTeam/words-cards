import { AddCategoryInterface } from './add-category.interface';
import { PaginationInterface } from '../../../../../common/interfaces/pagination.interface';
import { RowsAndCountInterface } from '../../../../../common/interfaces/rows-and-count.interface';
import { UuidInterface } from '../../../../../common/interfaces/uuid.interface';
import { CategoryInfoInterface } from './category-info.interface';
import { StatusInterface } from '../../common/interfaces/status.interface';
import { UpdateCategoryInterface } from './update-category.interface';

export interface CategoryRepositoryInterface<Category> {
  createCategories(data: AddCategoryInterface): Promise<Category[]>;
  findAllCategoriesAndCountByUserUuid(
    userUuid: string,
    pagination?: PaginationInterface,
  ): Promise<RowsAndCountInterface<Category>>;
  findCategoryInfoByUuid(data: UuidInterface): Promise<CategoryInfoInterface>;
  removeCategoryByUuid(data: UuidInterface): Promise<StatusInterface>;
  updateCategory(data: UpdateCategoryInterface): Promise<StatusInterface>;
}

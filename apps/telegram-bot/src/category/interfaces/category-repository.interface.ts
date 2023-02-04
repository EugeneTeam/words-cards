import { AddCategoryInterface } from './add-category.interface';
import { Observable } from 'rxjs';
import { AddCategoriesResponseInterface } from './add-categories-response.interface';
import { RowsAndCountInterface } from '../../../../../common/interfaces/rows-and-count.interface';
import { GetCategoriesListAndCountInterface } from './get-categories-list-and-count.interface';
import { UuidInterface } from '../../../../../common/interfaces/uuid.interface';
import { CategoryInfoInterface } from './category-info.interface';
import { StatusInterface } from '../../common/interfaces/status.interface';
import { UpdateCategoryInterface } from './update-category.interface';

export interface CategoryRepositoryInterface<Category> {
  createCategories(
    data: AddCategoryInterface,
  ): Observable<AddCategoriesResponseInterface>;
  findAllCategoriesAndCountByUserUuid(
    data: GetCategoriesListAndCountInterface,
  ): Observable<RowsAndCountInterface<Category>>;
  findCategoryInfoByUuid(
    data: UuidInterface,
  ): Observable<CategoryInfoInterface>;
  removeCategoryByUuid(data: UuidInterface): Observable<StatusInterface>;
  updateCategory(data: UpdateCategoryInterface): Observable<StatusInterface>;
}

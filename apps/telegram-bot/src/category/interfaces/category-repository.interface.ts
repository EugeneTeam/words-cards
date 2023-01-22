import { AddCategoryInterface } from './add-category.interface';
import { Observable } from 'rxjs';
import { AddCategoriesResponseInterface } from './add-categories-response.interface';
import { RowsAndCountInterface } from '../../../../../common/interfaces/rows-and-count.interface';
import { GetCategoriesListAndCountInterface } from './get-categories-list-and-count.interface';

export interface CategoryRepositoryInterface<Category> {
  createCategories(
    data: AddCategoryInterface,
  ): Observable<AddCategoriesResponseInterface>;
  findAllCategoriesAndCountByUserUuid(
    data: GetCategoriesListAndCountInterface,
  ): Observable<RowsAndCountInterface<Category>>;
}

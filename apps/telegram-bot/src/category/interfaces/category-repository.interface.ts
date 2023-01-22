import { AddCategoryInterface } from './add-category.interface';
import { Observable } from 'rxjs';
import { AddCategoriesResponseInterface } from './add-categories-response.interface';

export interface CategoryRepositoryInterface<Category> {
  createCategories(
    data: AddCategoryInterface,
  ): Observable<AddCategoriesResponseInterface>;
}

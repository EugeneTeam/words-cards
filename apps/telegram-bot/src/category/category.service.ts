import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { getDataFromObservableUtil } from '../utils/get-data-from-observable.util';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';
import { PACKAGE_NAME } from '../config/grpc/grpc.constants';
import { CategoryInterface } from './interfaces/category.interface';
import { AddCategoryInterface } from './interfaces/add-category.interface';
import { AddCategoriesResponseInterface } from './interfaces/add-categories-response.interface';
import { RowsAndCountInterface } from '../../../../common/interfaces/rows-and-count.interface';
import { GetCategoriesListAndCountInterface } from './interfaces/get-categories-list-and-count.interface';
import { CategoryInfoInterface } from './interfaces/category-info.interface';
import { StatusInterface } from '../common/interfaces/status.interface';

@Injectable()
export class CategoryService implements OnModuleInit {
  private categoryService: CategoryRepositoryInterface<CategoryInterface>;

  constructor(@Inject(PACKAGE_NAME) private readonly client: ClientGrpc) {}

  public onModuleInit(): void {
    this.categoryService =
      this.client.getService<CategoryRepositoryInterface<CategoryInterface>>(
        'CategoryService',
      );
  }

  public async updateCategory(
    categoryUuid: string,
    newCategoryName: string,
  ): Promise<StatusInterface> {
    const observable: Observable<StatusInterface> =
      await this.categoryService.updateCategory({
        uuid: categoryUuid,
        name: newCategoryName,
      });
    return getDataFromObservableUtil<StatusInterface>(observable);
  }

  public async removeCategoryByUuid(
    categoryUuid: string,
  ): Promise<StatusInterface> {
    const observable: Observable<StatusInterface> =
      await this.categoryService.removeCategoryByUuid({
        uuid: categoryUuid,
      });
    return getDataFromObservableUtil<StatusInterface>(observable);
  }

  public async findCategoryInfoByUuid(
    categoryUuid: string,
  ): Promise<CategoryInfoInterface> {
    const observable: Observable<CategoryInfoInterface> =
      await this.categoryService.findCategoryInfoByUuid({
        uuid: categoryUuid,
      });
    return getDataFromObservableUtil<CategoryInfoInterface>(observable);
  }

  public async createOneCategory(
    data: AddCategoryInterface,
  ): Promise<AddCategoriesResponseInterface> {
    const observable: Observable<AddCategoriesResponseInterface> =
      await this.categoryService.createCategories(data);
    return getDataFromObservableUtil<AddCategoriesResponseInterface>(
      observable,
    );
  }

  public async findAllCategoriesAndCountByUserUuid(
    data: GetCategoriesListAndCountInterface,
  ): Promise<RowsAndCountInterface<CategoryInterface>> {
    const observable: Observable<RowsAndCountInterface<CategoryInterface>> =
      await this.categoryService.findAllCategoriesAndCountByUserUuid(data);
    return getDataFromObservableUtil<RowsAndCountInterface<CategoryInterface>>(
      observable,
    );
  }
}

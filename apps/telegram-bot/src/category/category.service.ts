import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { getDataFromObservableUtil } from '../utils/get-data-from-observable.util';
import { CategoryRepositoryInterface } from './interfaces/category-repository.interface';
import { PACKAGE_NAME } from '../config/grpc/grpc.constants';
import { CategoryInterface } from './interfaces/category.interface';
import { AddCategoryInterface } from './interfaces/add-category.interface';
import { AddCategoriesResponseInterface } from './interfaces/add-categories-response.interface';

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

  public async createOneCategory(
    data: AddCategoryInterface,
  ): Promise<AddCategoriesResponseInterface> {
    const observable: Observable<AddCategoriesResponseInterface> =
      await this.categoryService.createCategories(data);
    return getDataFromObservableUtil<AddCategoriesResponseInterface>(
      observable,
    );
  }
}

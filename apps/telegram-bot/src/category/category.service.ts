import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
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
import { Cache } from 'cache-manager';
import { CacheWrapperUtil } from '../utils/cache-wrapper.util';

@Injectable()
export class CategoryService extends CacheWrapperUtil implements OnModuleInit {
  private categoryService: CategoryRepositoryInterface<CategoryInterface>;

  constructor(
    @Inject(PACKAGE_NAME) private readonly client: ClientGrpc,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
  }

  public onModuleInit(): void {
    this.categoryService =
      this.client.getService<CategoryRepositoryInterface<CategoryInterface>>(
        'CategoryService',
      );
  }

  public async updateCategory(
    categoryUuid: string,
    newCategoryName: string,
    userUuid: string,
  ): Promise<StatusInterface> {
    await this.clearCacheByUserUuid(this.cacheManager, userUuid);
    const observable: Observable<StatusInterface> =
      await this.categoryService.updateCategory({
        uuid: categoryUuid,
        name: newCategoryName,
      });
    return getDataFromObservableUtil<StatusInterface>(observable);
  }

  public async removeCategoryByUuid(
    categoryUuid: string,
    userUuid: string,
  ): Promise<StatusInterface> {
    await this.clearCacheByUserUuid(this.cacheManager, userUuid);
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
    await this.clearCacheByUserUuid(this.cacheManager, data.userUuid);
    const observable: Observable<AddCategoriesResponseInterface> =
      await this.categoryService.createCategories(data);
    return getDataFromObservableUtil<AddCategoriesResponseInterface>(
      observable,
    );
  }

  public async findAllCategoriesAndCountByUserUuid(
    data: GetCategoriesListAndCountInterface,
  ): Promise<RowsAndCountInterface<CategoryInterface>> {
    const key = `${data.userUuid}${data.pagination.limit}${data.pagination.offset}`;
    return this.cacheWrapper<
      RowsAndCountInterface<CategoryInterface>,
      GetCategoriesListAndCountInterface
    >(
      this.categoryService.findAllCategoriesAndCountByUserUuid,
      this.cacheManager,
      key,
      data,
    );
  }
}

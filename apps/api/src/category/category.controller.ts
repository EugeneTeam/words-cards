import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { AddCategoryInterface } from './interfaces/add-category.interface';
import { AddCategoriesResponseInterface } from './interfaces/add-categories-response.interface';
import { RowsAndCountInterface } from '../../../../common/interfaces/rows-and-count.interface';
import { CategoryInterface } from './interfaces/category.interface';
import { GetCategoriesListAndCountInterface } from './interfaces/get-categories-list-and-count.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @GrpcMethod('CategoryService', 'CreateCategories')
  async createCategories(
    data: AddCategoryInterface,
  ): Promise<AddCategoriesResponseInterface> {
    return this.categoryService.createCategories(data);
  }

  @GrpcMethod('CategoryService', 'FindAllCategoriesAndCountByUserUuid')
  public async findAllCategoriesAndCountByUserUuid(
    data: GetCategoriesListAndCountInterface,
  ): Promise<RowsAndCountInterface<CategoryInterface>> {
    return this.categoryService.findAllCategoriesAndCountByUserUuid(
      data.userUuid,
      data?.pagination,
    );
  }
}

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { AddCategoryInterface } from './interfaces/add-category.interface';
import { AddCategoriesResponseInterface } from './interfaces/add-categories-response.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @GrpcMethod('CategoryService', 'CreateCategories')
  async createCategories(
    data: AddCategoryInterface,
  ): Promise<AddCategoriesResponseInterface> {
    let t = await this.categoryService.createCategories(data);
    console.log('---------------------------------------');
    console.log(t);
    return t;
  }
}

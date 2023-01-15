import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CategoryInterface } from './interfaces/category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @GrpcMethod('CategoryService', 'CreateOneCategory')
  // TODO any
  async createOneCategory(data: any): Promise<CategoryInterface> {
    return this.categoryService.createOneCategory(data);
  }
}

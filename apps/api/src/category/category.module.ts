import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRepositoryProvider } from './providers/category-repository.provider';
import { CategoryController } from './category.controller';

@Module({
  providers: [CategoryService, CategoryRepositoryProvider],
  controllers: [CategoryController],
})
export class CategoryModule {}

export interface CategoryRepositoryInterface<Category> {
  // TODO any
  createOneCategory(data: any): Promise<Category>;
}

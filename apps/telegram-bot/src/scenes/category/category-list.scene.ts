import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { CategoryService } from '../../category/category.service';
import { CategoryListComponentScene } from './category-list-component.scene';
import { ContextInterface } from '../../interfaces/context.interface';

@Scene('categories-list-scene')
export class CategoryListScene extends CategoryListComponentScene {
  constructor(categoryService: CategoryService) {
    super({
      categoryService: categoryService,
      sceneName: 'categories-list-scene',
      categoryCallback: 'CATEGORY',
      customBackButtonOptions: {
        disableBackButton: false,
        transitionSceneName: 'category-menu-scene',
      },
    });
  }

  @SceneEnter()
  private async enter(@Ctx() context: ContextInterface): Promise<void> {
    await this.renderList(context);
  }
}

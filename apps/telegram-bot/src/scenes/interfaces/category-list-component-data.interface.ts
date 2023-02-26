import { CategoryService } from '../../category/category.service';
import { BackButtonOptionsInterface } from './back-button-option.interface';

export interface CategoryListComponentDataInterface {
  readonly categoryService: CategoryService;
  readonly sceneName: string;
  /**
   * This is just part of the callback.
   * The callback consists of: your_callback_name:uuid
   * Create an action handler based on a regular expression
   */
  readonly categoryCallback?: string;
  readonly customBackButtonOptions: BackButtonOptionsInterface;
}

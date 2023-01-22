import { PaginationInterface } from '../../../../../common/interfaces/pagination.interface';

export interface GetCategoriesListAndCountInterface {
  readonly userUuid: string;
  readonly pagination?: PaginationInterface;
}

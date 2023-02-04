export interface RowsAndCountInterface<Type> {
  readonly rows: Type[];
  readonly count: number;
  readonly currentPage?: number;
  readonly maxPage?: number;
}

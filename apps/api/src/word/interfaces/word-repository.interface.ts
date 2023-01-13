export interface WordRepositoryInterface<Word> {
  createOne(data: any): Promise<Word>;
}

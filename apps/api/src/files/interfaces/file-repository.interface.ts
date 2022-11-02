export interface FileRepositoryInterface<File> {
  getOneByName(name: string): Promise<File>;
  updateOneByName(name: string, fileToken: string): Promise<File>;
  addOne(name: string, fileToken: string): Promise<File>;
}

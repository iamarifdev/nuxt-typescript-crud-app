export class Pagination {
  public page?: number;
  public pageSize?: number;
  public order?: string;
  public sort?: string;
  public searchTerm?: string;

  constructor(param: any) {
    this.page = param.page || 0;
    this.pageSize = param.pageSize || 10;
    this.sort = param.sort || 'updatedAt';
    this.order = param.order || 'desc';
    this.searchTerm = param.searchTerm;
  }
}

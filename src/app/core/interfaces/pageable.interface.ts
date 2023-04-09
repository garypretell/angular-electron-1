import { ISort } from './sort.interface';

/* eslint-disable @typescript-eslint/naming-convention */
export interface IPageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: ISort;
  unpaged: boolean;
}

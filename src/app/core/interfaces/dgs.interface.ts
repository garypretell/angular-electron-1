/* eslint-disable @typescript-eslint/naming-convention */

import { IPageable } from './pageable.interface';
import { ISort } from './sort.interface';

export interface IDgs {
  content: IDgsResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: IPageable;
  size: number;
  sort: ISort;
  totalElements: number;
  totalPages: number;
}

export interface IDgsResponse {
  archiveFolderName: string;
  archiveReferenceNumber: string;
  archiveReferenceNumber1: string;
  comment: null;
  comments: string;
  cvRecordType1: string;
  dateRange: string;
  date_load: Date;
  date_process: Date | null;
  dgs: string;
  fsFolderName: string;
  language: string;
  languageTerm: string;
  locality: string;
  notes: string;
  oid_dgs: string;
  oid_donor: number;
  physicalDescription: string;
  place: string;
  placeTerm: string;
  primaryLanguage: string;
  publisher: string;
  recordCreatorAutor: string;
  recordDates: string;
  recordDatesStandard: string;
  recordTitle: string;
  recordTypeDescription: string;
  status: string;
  title: string;
  totalImage: number;
  uad: string;
  volumeDesignation: string;
  volumenId: string;
}

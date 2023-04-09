/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EtlEndpoint } from '../../shared/utils/endpoints/etl.endpoint';
import { IExtractBody } from '../interfaces/extract.interface';
import { IProcessBody } from '../interfaces/process.interface';
import { ApiService } from './api.service';
import { IReProcessBody } from '../interfaces/reprocess.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EtlService {
  constructor(private readonly apiService: ApiService, private http: HttpClient) {}

  /**
   * Load
   */
  extract(body: IExtractBody): Observable<any> {
    return this.apiService.post(EtlEndpoint.Extract, body);
  }

  /**
   * Process
   */
  transform(body: IProcessBody): Observable<any> {
    return this.apiService.post(EtlEndpoint.Transform, body);
  }

  /**
   * ReProcess
   */
  retransform(body: IReProcessBody): Observable<any> {
    return this.apiService.post(EtlEndpoint.ReTransform, body);
  }

}

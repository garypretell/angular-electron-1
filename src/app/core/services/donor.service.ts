import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonorEndpoint } from '../../shared/utils/endpoints/donor.endpoint';
import { Observable, shareReplay } from 'rxjs';
import { ApiService } from './api.service';
import { IDonor } from '../interfaces/donor.interface';


@Injectable({
  providedIn: 'root',
})
export class DonorService {
  constructor(
    private readonly apiService: ApiService,
    private http: HttpClient
  ) {}

  /**
   * Obtener Pagination donors
   */
  getDonorsPagination(params: any): Observable<any> {
    return this.apiService.get(DonorEndpoint.GetDonorsProxy, { params
      , observe: 'response' as 'body'}).pipe(shareReplay(1));
  }

  /**
   * Obtener donor by Id
   */
  getDonorById(params: any): Observable<any> {
    return this.apiService.get(DonorEndpoint.GetDonorsByIdProxy, { params
      , observe: 'response' as 'body'}).pipe(shareReplay(1));
  }

  /**
   * Actualizar estado donor
   */
  updateDonor(body: any,
    params: any): Observable<any> {
    return this.apiService.put(DonorEndpoint.UpdateDonor, body, { params, default: [] });
  }
}

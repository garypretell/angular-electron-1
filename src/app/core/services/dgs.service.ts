import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IDgs, IDgsResponse } from '../../core/interfaces/dgs.interface';
import { DgsEndpoint } from '../../shared/utils/endpoints/dgs.endpoint';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root',
})
export class DgsService {
  constructor(
    private readonly apiService: ApiService
  ) {}

  /**
   * Obtener Lista Dgs by Donor
   */
  getDgsByDonor(params: any): Observable<IDgs[]> {
    return this.apiService.get<IDgs[]>(DgsEndpoint.GetDgsByDonor, {
      params,
      observe: 'response' as 'body'
    }).pipe(shareReplay(1));
  }

  /**
   * Obtener Dgs by Oid
   */
  selectDgsOid(params: any): Observable<IDgsResponse> {
    return this.apiService.get<IDgsResponse>(DgsEndpoint.GetDgsByOid, {
      params,
      observe: 'response' as 'body'
    }).pipe(shareReplay(1));
  }

  /**
   * Actualizar estado Dgs
   */
  updateDgs(body: any,
    params: any): Observable<any> {
    return this.apiService.put(DgsEndpoint.UpdateDgs, body, { params, default: [] });
  }

  /**
   * Actualizar estado Dgs
   */
  updateDgsbyFolderStatus(body: any,
    params: any): Observable<any> {
    return this.apiService.put(DgsEndpoint.UpdateDgsbyFolderStatus, body, { params, default: [] });
  }

}

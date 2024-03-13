import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParcelsModule } from './parcels.module';
import { ApiService } from '../../core/services/api.service';
import {
  CreateParcelBody,
  CreateParcelResponse,
  GetParcelsResponse,
} from './types';

@Injectable({
  providedIn: ParcelsModule,
})
export class ParcelsService {
  constructor(private apiService: ApiService) {}

  getParcels(queryString: string): Observable<GetParcelsResponse> {
    return this.apiService.get('http://localhost:3000/api/parcels', {
      params: new HttpParams({ fromString: queryString }),
    });
  }

  createParcel(body: CreateParcelBody): Observable<CreateParcelResponse> {
    return this.apiService.post('http://localhost:3000/api/parcels', body);
  }
}

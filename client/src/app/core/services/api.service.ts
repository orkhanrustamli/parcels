import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type {
  ApiGetOptions,
  ApiPostOptions,
  ApiPutOptions,
  ApiDeleteOptions,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: ApiGetOptions = {}): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T, U>(
    url: string,
    body: U,
    options: ApiPostOptions = {}
  ): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  put<T, U>(url: string, body: U, options: ApiPutOptions = {}): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  delete<T>(url: string, options: ApiDeleteOptions = {}): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}

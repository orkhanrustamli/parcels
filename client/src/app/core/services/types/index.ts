import { HttpClient } from '@angular/common/http';

export type ApiGetOptions = Parameters<HttpClient['get']>[1];
export type ApiPostOptions = Parameters<HttpClient['post']>[1];
export type ApiPutOptions = Parameters<HttpClient['put']>[1];
export type ApiDeleteOptions = Parameters<HttpClient['delete']>[1];

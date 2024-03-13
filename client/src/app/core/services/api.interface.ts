import { HttpClient } from '@angular/common/http';

export interface Options extends Parameters<HttpClient['request']> {}

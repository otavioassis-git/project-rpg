import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public get(
    url: string,
    params: any = null,
    skip: boolean = false
  ): Observable<any> {
    let payload: any = {
      params,
      headers: skip ? { skip: 'true', api: 'true' } : { api: 'true' },
    };

    return this.httpClient.get(`${this.formatUrl(url)}`, payload);
  }

  public put(
    url: string,
    params: any = null,
    skip: boolean = false
  ): Observable<any> {
    let headers: any = skip ? { skip: 'true', api: 'true' } : { api: 'true' };

    return this.httpClient.put(`${this.formatUrl(url)}`, params, { headers });
  }

  public post(
    url: string,
    params: any = null,
    skip: boolean = false
  ): Observable<any> {
    let headers: any = skip ? { skip: 'true', api: 'true' } : { api: 'true' };

    return this.httpClient.post(`${this.formatUrl(url)}`, params, { headers });
  }

  public delete(url: string, skip: boolean = false): Observable<any> {
    let headers: any = skip ? { skip: 'true', api: 'true' } : { api: 'true' };

    return this.httpClient.delete(`${this.formatUrl(url)}`, { headers });
  }

  private formatUrl(url: string) {
    url = url.startsWith('/') ? url : `/${url}`;
    return url;
  }
}

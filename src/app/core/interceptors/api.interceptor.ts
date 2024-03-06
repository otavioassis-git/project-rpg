import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const URL = environment.url;

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('api') && request.headers.get('api') == 'true') {
      const req = request.clone({
        url: URL + request.url,
        headers: request.headers.delete('api'),
      });
      return next.handle(req);
    }

    return next.handle(request);
  }
}

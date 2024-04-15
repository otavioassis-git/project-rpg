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
export class ApiTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const customEnv = localStorage.getItem('env');

    if (request.headers.get('api') && request.headers.get('api') == 'true') {
      let req = request.clone({
        url: (customEnv ? customEnv : URL) + request.url,
        headers: request.headers.delete('api'),
      });

      // adding token
      if (localStorage.getItem('user')) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        if (token) {
          req = req.clone({
            headers: req.headers.set('Authorization', token),
          });
        }
      }

      return next.handle(req);
    }

    return next.handle(request);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { resolve } from 'path';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private httpClient: HttpClient, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.httpClient
      .get('assets/isServe.json')
      .pipe(take(1))
      .subscribe((value: any) => {
        if (value.serve) {
          this.httpClient
            .get('assets/login.json')
            .pipe(take(1))
            .subscribe(
              (value: any) => {
                if (!value.token) this.router.navigate(['auth/login']);
              },
              (error) => {
                this.router.navigate(['auth/login']);
              }
            );
        } else {
          try {
            let value = JSON.parse(
              window
                .require('fs')
                .readFileSync(
                  resolve(
                    __dirname,
                    '../',
                    '../',
                    '../',
                    'Project-RPG-common',
                    'tutorials.json'
                  )
                )
            );

            if (!value.token) this.router.navigate(['auth/login']);
          } catch (error) {
            this.router.navigate(['auth/login']);
          }
        }
      });

    return true;
  }
}

import { SideMenuService } from './../services/side-menu.service';
import { AuthService } from './../../modules/auth/services/auth.service';
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
import { User } from '../../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
    private sideMenuService: SideMenuService
  ) {}

  logout() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.saveLogin({
      username: user ? user.username : '',
      token: '',
    });
    this.sideMenuService.saveCurrentRoute(null);
    this.router.navigate(['/auth/login']);
  }

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
                if (!value.token) this.logout();
              },
              (error) => {
                this.logout();
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
                    'login.json'
                  )
                )
            );

            if (!value.token) this.logout();
          } catch (error) {
            this.logout();
          }
        }
      });

    return true;
  }
}

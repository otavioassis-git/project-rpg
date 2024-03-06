import { SideMenuService } from './../../../../services/side-menu.service';
import { SettingsService } from './../../../../services/settings.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../../../modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PasswordChangeComponent } from '../password-change/password-change.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [DialogService],
})
export class AccountComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private service: SettingsService,
    private dialog: DialogService,
    private sideMenuService: SideMenuService
  ) {}

  logout() {
    this.authService.saveLogin({ email: '', token: '' });
    this.service.showSettings(false);
    this.sideMenuService.saveCurrentRoute(null);
    this.router.navigate(['/auth/login']);
  }

  openChangePassword() {
    this.dialog.open(PasswordChangeComponent, {
      header: 'Password change',
    });
  }
}

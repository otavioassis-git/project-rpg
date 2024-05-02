import { SideMenuService } from './../../../../services/side-menu.service';
import { SettingsService } from './../../../../services/settings.service';
import { Router } from '@angular/router';
import {
  AuthService,
  User,
} from './../../../../../modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PasswordChangeComponent } from '../password-change/password-change.component';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { take } from 'rxjs';
import { checkOfflineMode } from '../../../../../shared/utils/checkOfflineMode';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [DialogService],
})
export class AccountComponent implements OnInit {
  isOfflineMode: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private service: SettingsService,
    private dialog: DialogService,
    private sideMenuService: SideMenuService
  ) {}

  ngOnInit(): void {
    this.isOfflineMode = checkOfflineMode();
  }

  logout() {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      header: 'Logout',
      data: {
        text: 'Are you sure you want to leave?',
      },
    });
    ref.onClose.pipe(take(2)).subscribe((response) => {
      if (response) {
        const user: User = JSON.parse(localStorage.getItem('user'));
        this.authService.saveLogin({
          username: user ? user.username : '',
          token: '',
        });
        this.service.showSettings(false);
        this.sideMenuService.saveCurrentRoute(null);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  quitOfflineMode() {
    this.authService.saveLogin({
      username: '',
      token: '',
    });
    this.service.showSettings(false);
    this.sideMenuService.saveCurrentRoute(null);
    localStorage.setItem('offlineMode', 'false');
    this.router.navigate(['/auth/login']);
  }

  openChangePassword() {
    this.dialog.open(PasswordChangeComponent, {
      header: 'Password change',
    });
  }
}

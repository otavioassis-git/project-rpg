import { Component } from '@angular/core';
import packageInfo from '../../../../package.json';
import { DialogService } from 'primeng/dynamicdialog';
import { EnvChangerComponent } from './components/env-changer/env-changer.component';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  providers: [DialogService],
})
export class AuthLayoutComponent {
  lVersion = packageInfo.version;

  constructor(private dialog: DialogService) {}

  openEnvChanger() {
    this.dialog.open(EnvChangerComponent, {
      header: 'Change backend environment',
    });
  }
}

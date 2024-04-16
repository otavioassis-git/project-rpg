import { Component } from '@angular/core';
import packageInfo from '../../../../package.json';
import { DialogService } from 'primeng/dynamicdialog';
import { EnvChangerComponent } from './components/env-changer/env-changer.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  providers: [DialogService],
})
export class AuthLayoutComponent {
  lVersion = packageInfo.version;
  clickCount = 0;
  showChangeEnv = false;

  constructor(private dialog: DialogService) {}

  clickCountHandler() {
    this.clickCount++;
    if (this.clickCount == 5) {
      this.showChangeEnv = true;
    }
  }

  openEnvChanger() {
    const ref = this.dialog.open(EnvChangerComponent, {
      header: 'Change backend environment',
    });

    ref.onClose.pipe(take(2)).subscribe(() => {
      this.clickCount = 0;
      this.showChangeEnv = false;
    });
  }
}

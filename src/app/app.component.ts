import { NotificationService } from './core/services/notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
    this.notificationService.get().subscribe((value) => {
      if (value) this.messageService.add(value);
    });
  }
}

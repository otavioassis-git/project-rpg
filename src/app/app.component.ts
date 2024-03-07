import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { resolve } from 'path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  showContent = true;
  showMenus = true;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private httpClient: HttpClient
  ) {
    this.translate.setDefaultLang('en');
    console.log('environment', environment);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {}

  loadEnv() {
    this.httpClient
      .get('assets/isServe.json')
      .pipe(take(1))
      .subscribe((value: any) => {
        if (value.serve) {
          this.httpClient
            .get('assets/env.json')
            .pipe(take(1))
            .subscribe((value: { env: string }) => {
              localStorage.setItem('env', value.env);
            });
        } else {
          try {
            let value: { env: string } = JSON.parse(
              window
                .require('fs')
                .readFileSync(
                  resolve(
                    __dirname,
                    '../',
                    '../',
                    '../',
                    'Project-RPG-common',
                    'env.json'
                  )
                )
            );
            localStorage.setItem('env', value.env);
          } catch (error) {}
        }
      });
  }
}

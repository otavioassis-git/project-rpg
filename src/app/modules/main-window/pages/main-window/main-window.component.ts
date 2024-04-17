import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Tutorials } from '../../../../core/services/tutorial.service';
import { resolve } from 'path';
import { Settings } from '../../../../core/services/settings.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss'],
})
export class MainWindowComponent implements OnInit {
  username: string = '';
  isOfflineMode: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('user') &&
      localStorage.getItem('offlineMode') != 'true'
    ) {
      this.username = JSON.parse(localStorage.getItem('user')).username;
    } else {
      this.username = 'player';
    }

    this.loadSettings();
  }

  loadSettings() {
    this.loadTutorials();

    this.httpClient
      .get('assets/isServe.json')
      .pipe(take(1))
      .subscribe((value: any) => {
        if (value.serve) {
          this.httpClient
            .get('assets/settings.json')
            .pipe(take(1))
            .subscribe((value: Settings) => {
              localStorage.setItem('settings', JSON.stringify(value));
            });
        } else {
          try {
            let value: Settings = JSON.parse(
              window
                .require('fs')
                .readFileSync(
                  resolve(
                    __dirname,
                    '../',
                    '../',
                    '../',
                    'Project-RPG-common',
                    'settings.json'
                  )
                )
            );
            localStorage.setItem('settings', JSON.stringify(value));
          } catch (error) {}
        }
      });
  }

  loadTutorials() {
    this.httpClient
      .get('assets/isServe.json')
      .pipe(take(1))
      .subscribe((value: any) => {
        if (value.serve) {
          this.httpClient
            .get('assets/tutorials.json')
            .pipe(take(1))
            .subscribe((value: Tutorials) => {
              localStorage.setItem('tutorials', JSON.stringify(value));
            });
        } else {
          try {
            let value: Tutorials = JSON.parse(
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
            localStorage.setItem('tutorials', JSON.stringify(value));
          } catch (error) {}
        }
      });
  }
}

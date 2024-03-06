import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Tutorials } from '../../../../core/services/tutorial.service';
import { resolve } from 'path';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss'],
})
export class MainWindowComponent implements OnInit {
  username: string = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.username = JSON.parse(localStorage.getItem('user')).username;
    }

    this.loadSettings();
  }

  loadSettings() {
    this.loadTutorials();
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

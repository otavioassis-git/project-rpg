import { SideMenuService } from './../../services/side-menu.service';
import { ImageFinderService } from './../../../modules/image-finder/services/image-finder.service';
import { TutorialService, Tutorials } from './../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import packageInfo from '../../../../../package.json';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { resolve } from 'path';
import {
  X_BOUND,
  X_RETRACTED,
  Y_BOUND,
} from '../../../modules/image-finder/pages/image-finder/image-finder.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  lVersion = packageInfo.version;

  showSettings: boolean;
  stateOptions: any[] = [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ];

  tutorials: Tutorials;

  settings = {
    tutorials: false,
  };

  constructor(
    private service: SettingsService,
    private httpClient: HttpClient,
    private tutorialService: TutorialService,
    private imageFinderService: ImageFinderService,
    private sideMenuService: SideMenuService
  ) {}

  ngOnInit(): void {
    this.service.getShowSettings().subscribe((value) => {
      this.showSettings = value;
      if (value) {
        this.init();
        if (window.location.hash == '#/image-finder')
          this.imageFinderService.closeGoogle();
      } else {
        if (window.location.hash == '#/image-finder') {
          this.service.reloadContent(true);
        }
      }
    });
  }

  init() {
    this.initTutorials();
  }

  initTutorials() {
    this.getTutorials();
  }

  handleTutorialChange(event) {
    this.tutorials = this.tutorialService.getDefaultTutorials();
    if (!event.value) {
      for (let key of Object.keys(this.tutorials)) {
        this.tutorials[key] = false;
      }
    }
    this.tutorialService.saveTutorials(this.tutorials);
  }

  getTutorials() {
    this.httpClient
      .get('assets/isServe.json')
      .pipe(take(1))
      .subscribe((value: any) => {
        if (value.serve) {
          this.httpClient
            .get('assets/tutorials.json')
            .pipe(take(1))
            .subscribe(
              (value: Tutorials) => {
                this.tutorials = value;
                let aux = false;
                for (let key of Object.keys(this.tutorials)) {
                  if (this.tutorials[key]) aux = true;
                }
                this.settings.tutorials = aux;
              },
              (error) => {}
            );
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

            this.tutorials = value;
            let aux = false;
            for (let key of Object.keys(this.tutorials)) {
              if (this.tutorials[key]) aux = true;
            }
            this.settings.tutorials = aux;
          } catch (error) {}
        }
      });
  }

  close() {
    this.service.showSettings(false);
  }
}

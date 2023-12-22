import { TutorialService } from './../../../../core/services/tutorial.service';
import { take } from 'rxjs';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ImageFinderService } from '../../services/image-finder.service';
import { SideMenuService } from '../../../../core/services/side-menu.service';
import { Tutorials } from '../../../../core/services/tutorial.service';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'path';

const Y_BOUND = 37;
const X_BOUND = 150;
const X_RETRACTED = 34;

@Component({
  selector: 'app-image-finder',
  templateUrl: './image-finder.component.html',
  styleUrls: ['./image-finder.component.scss'],
})
export class ImageFinderComponent implements OnInit, OnDestroy {
  isRetracted: boolean;
  init = true;

  @HostListener('window:resize')
  onResize(): void {
    const container = document.getElementById('image-finder-container');
    const bounds = {
      x: this.isRetracted ? X_RETRACTED : X_BOUND,
      y: Y_BOUND,
      width: container.clientWidth,
      height: container.clientHeight,
    };
    this.service.repositionGoogleWindow(bounds);
  }

  tutorials: Tutorials;
  isLoading = true;
  constructor(
    private service: ImageFinderService,
    private sidemenuService: SideMenuService,
    private httpClient: HttpClient,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.tutorials = this.tutorialService.getDefaultTutorials();
    this.getTutorials();
  }

  openGoogle(save?: boolean) {
    this.tutorials.google_tutorial = false;
    if (save) this.tutorialService.saveTutorials(this.tutorials);

    const container = document.getElementById('image-finder-container');
    const bounds = {
      x: this.isRetracted ? X_RETRACTED : X_BOUND,
      y: Y_BOUND,
      width: container.clientWidth,
      height: container.clientHeight,
    };
    this.service.openGoogle(bounds);
  }

  ngOnDestroy(): void {
    this.service.closeGoogle();
  }

  menuRetractionSubscription() {
    this.sidemenuService.getIsRetracted().subscribe((value) => {
      this.isRetracted = value;
      if (!this.tutorials.google_tutorial && !this.init) {
        for (let i = 0; i <= 250; i += 5) {
          setTimeout(() => {
            const container = document.getElementById('image-finder-container');
            const bounds = {
              x: this.isRetracted
                ? X_BOUND - Math.round((X_BOUND - X_RETRACTED) * (i / 250))
                : X_RETRACTED + Math.round((X_BOUND - X_RETRACTED) * (i / 250)),
              y: Y_BOUND,
              width: container.clientWidth,
              height: container.clientHeight,
            };
            this.service.repositionGoogleWindow(bounds);
          }, i);
        }
      }
      this.init = false;
    });
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
                if (!this.tutorials.google_tutorial) this.openGoogle();
                this.menuRetractionSubscription();
                this.isLoading = false;
              },
              (error) => {
                this.isLoading = false;
              }
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
            if (!this.tutorials.google_tutorial) this.openGoogle();
            this.menuRetractionSubscription();
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
          }
        }
      });
  }
}

import { take } from 'rxjs';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ImageFinderService } from '../../services/image-finder.service';
import { SideMenuService } from '../../../../core/services/side-menu.service';

export const Y_BOUND = 37;
export const X_BOUND = 150;
export const X_RETRACTED = 34;

@Component({
  selector: 'app-image-finder',
  templateUrl: './image-finder.component.html',
  styleUrls: ['./image-finder.component.scss'],
})
export class ImageFinderComponent implements OnInit, OnDestroy {
  showTutorial = true;
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

  constructor(
    private service: ImageFinderService,
    private sidemenuService: SideMenuService
  ) {}

  ngOnInit(): void {
    this.sidemenuService
      .getIsRetracted()
      .pipe(take(1))
      .subscribe((value) => {
        this.isRetracted = value;
        this.tutorials = this.tutorialService.getDefaultTutorials();
        this.getTutorials();
      });
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
      if (!this.showTutorial && !this.init) {
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

  openGoogle() {
    this.service.setShowTutorial(false);
    this.showTutorial = false;

    setTimeout(() => {
      const container = document.getElementById('image-finder-container');
      const bounds = {
        x: this.isRetracted ? X_RETRACTED : X_BOUND,
        y: Y_BOUND,
        width: container.clientWidth,
        height: container.clientHeight,
      };
      this.service.openGoogle(bounds);
    }, 100);
  }

  ngOnDestroy(): void {
    this.service.closeGoogle();
  }
}

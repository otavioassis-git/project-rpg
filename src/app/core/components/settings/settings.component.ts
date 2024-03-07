import { ImageFinderService } from './../../../modules/image-finder/services/image-finder.service';
import { TutorialService, Tutorials } from './../../services/tutorial.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import packageInfo from '../../../../../package.json';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {
  lVersion = packageInfo.version;

  subscription: Subscription;
  clickCount = 0;
  showSettings: boolean;
  username: string = '';

  constructor(
    private service: SettingsService,
    private tutorialService: TutorialService,
    private imageFinderService: ImageFinderService
  ) {}

  ngOnInit(): void {
    this.subscription = this.service.getShowSettings().subscribe((value) => {
      this.showSettings = value;
      if (value) {
        this.init();
        if (window.location.hash == '#/image-finder')
          this.imageFinderService.closeGoogle();
        if (localStorage.getItem('user'))
          this.username = JSON.parse(localStorage.getItem('user')).username;
      } else {
        if (window.location.hash == '#/image-finder') {
          this.service.reloadContent(true);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  init() {
    this.clickCount = 0;
  }

  addClickCount() {
    this.clickCount++;
    if (this.clickCount == 6) {
      this.service.toggleDevTools();
    }
  }

  close() {
    this.service.showSettings(false);
  }
}

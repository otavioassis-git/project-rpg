import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SideMenuService } from '../../services/side-menu.service';
import { take } from 'rxjs';
import { SettingsService } from '../../services/settings.service';
import { checkOfflineMode } from '../../../shared/utils/checkOfflineMode';

const BASE_TOP = 60;
const TOP_ADDER = 45;

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      icon: 'pi-map',
      label: 'Map hider',
      route: 'map-hider',
      height: 0,
      offline: true,
    },
    {
      icon: 'pi-images',
      label: 'Image finder',
      route: 'image-finder',
      height: 0,
      offline: true,
    },
    {
      icon: 'pi-share-alt',
      label: 'Comunity',
      route: 'comunity-images',
      height: 0,
      offline: false,
    },
  ];

  selectedMenu: MenuItem;
  isRetracted = false;
  isOfflineMode: boolean = false;

  constructor(
    private service: SideMenuService,
    private router: Router,
    private settingsService: SettingsService,
    private notificationService: NotificationService
  ) {
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].height = BASE_TOP + i * TOP_ADDER;
    }
  }

  ngOnInit(): void {
    if (checkOfflineMode()) {
      for (let [idx, item] of this.menuItems.entries()) {
        if (!item.offline) this.menuItems.splice(idx, 1);
      }
    }
    this.service
      .getSavedRoute()
      .pipe(take(1))
      .subscribe(
        (value: MenuItem) => {
          if (!window.location.hash.includes('#/map-projection')) {
            if (localStorage.getItem('user') && value && !checkOfflineMode()) {
              this.notificationService.add({
                severity: 'info',
                summary: `Welcome back ${
                  JSON.parse(localStorage.getItem('user')).username
                }!`,
              });
            }
            this.navigate(value);
          }
        },
        (error) => {
          this.selectedMenu = null;
        }
      );
  }

  toggleRetract() {
    this.isRetracted = !this.isRetracted;
    this.service.setIsRetracted(this.isRetracted);
  }

  navigate(item: MenuItem) {
    const indicator = document.getElementById('selected-indicator');
    indicator.style.top = item.height + 'px';
    this.selectedMenu = item;
    this.router.navigateByUrl(item.route);
    this.service.saveCurrentRoute(this.selectedMenu);
  }

  showSettings() {
    this.settingsService.showSettings(true);
  }
}

import { Component } from '@angular/core';
import { MaximizeServiceService } from '../../services/maximize-service.service';
import { Router } from '@angular/router';
import { MenuItem, SideMenuService } from '../../services/side-menu.service';
import { take } from 'rxjs';
import { SettingsService } from '../../services/settings.service';

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
    },
    {
      icon: 'pi-images',
      label: 'Image finder',
      route: 'image-finder',
      height: 0,
    },
    // {
    //   icon: 'pi-volume-up',
    //   label: 'Sound board',
    //   route: 'soundboard',
    // },
    // {
    //   icon: 'pi-box',
    //   label: '',
    //   route: '',
    // },
  ];

  selectedMenu: MenuItem;

  isRetracted = false;
  isMaximized: boolean;

  constructor(
    private service: SideMenuService,
    private router: Router,
    private settingsService: SettingsService
  ) {
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].height = BASE_TOP + i * TOP_ADDER;
    }
  }

  ngOnInit(): void {
    this.service
      .getSavedRoute()
      .pipe(take(1))
      .subscribe(
        (value: MenuItem) => {
          if (!window.location.hash.includes('#/map-projection'))
            this.navigate(value);
        },
        (error) => {
          this.selectedMenu = null;
        }
      );
  }

  toggleRetract() {
    this.isRetracted = !this.isRetracted;
    this.sideMenuService.setIsRetracted(this.isRetracted);
  }

  navigate(item: MenuItem) {
    const indicator = document.getElementById('selected-indicator');
    indicator.style.top = item.height + 'px';
    this.selectedMenu = item;
    this.router.navigateByUrl(item.route);
  }

  showSettings() {
    this.settingsService.showSettings(true);
  }
}

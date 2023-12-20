import { Component } from '@angular/core';
import { MaximizeServiceService } from '../../services/maximize-service.service';
import { Router } from '@angular/router';
import { SideMenuService } from '../../services/side-menu.service';
import packageInfo from '../../../../../package.json';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  lVersion = packageInfo.version;

  menuItems: MenuItem[] = [
    {
      icon: 'pi-map',
      label: 'Map hider',
      route: 'map-hider',
    },
    {
      icon: 'pi-images',
      label: 'Image finder',
      route: 'image-finder',
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
    private sideMenuService: SideMenuService,
    private maximizeService: MaximizeServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.maximizeService.getIsMaximized().subscribe((value: boolean) => {
      this.isMaximized = value;
    });
  }

  toggleRetract() {
    this.isRetracted = !this.isRetracted;
    this.sideMenuService.setIsRetracted(this.isRetracted);
  }

  navigate(item: MenuItem) {
    this.selectedMenu = item;
    this.router.navigateByUrl(item.route);
  }
}

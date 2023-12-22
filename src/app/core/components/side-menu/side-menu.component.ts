import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MaximizeServiceService } from '../../services/maximize-service.service';
import { Router } from '@angular/router';
import { MenuItem, SideMenuService } from '../../services/side-menu.service';
import packageInfo from '../../../../../package.json';
import { take } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
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
  ];

  selectedMenu: MenuItem;

  isRetracted = false;
  isMaximized: boolean;

  constructor(
    private service: SideMenuService,
    private maximizeService: MaximizeServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.maximizeService.getIsMaximized().subscribe((value: boolean) => {
      this.isMaximized = value;
    });
    this.service
      .getSavedRoute()
      .pipe(take(1))
      .subscribe(
        (value: MenuItem) => {
          this.navigate(value);
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
    this.selectedMenu = item;
    this.router.navigateByUrl(item.route);
    this.service.saveCurrentRoute(this.selectedMenu);
  }
}

import { Component } from '@angular/core';
import { MaximizeServiceService } from '../../services/maximize-service.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  menuItems = [
    {
      icon: 'pi-volume-up',
      label: 'Sound board',
      redirect: '',
    },
    {
      icon: 'pi-map',
      label: 'Map hider',
      redirect: '',
    },
  ];

  selectedMenu;

  isRetracted = false;
  isMaximized: boolean;

  constructor(private maximizeService: MaximizeServiceService) {}

  ngOnInit(): void {
    this.maximizeService.getIsMaximized().subscribe((value: boolean) => {
      this.isMaximized = value;
    });
  }

  toggleRetract() {
    this.isRetracted = !this.isRetracted;
  }
}

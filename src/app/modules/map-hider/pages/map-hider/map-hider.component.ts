import { NotificationService } from './../../../../core/services/notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaximizeServiceService } from '../../../../core/services/maximize-service.service';
import { SideMenuService } from '../../../../core/services/side-menu.service';

@Component({
  selector: 'app-map-hider',
  templateUrl: './map-hider.component.html',
  styleUrls: ['./map-hider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapHiderComponent implements OnInit {
  image;
  isMaximized: boolean;
  isRetracted: boolean;

  boxArray = [];
  boxCount = 0;

  constructor(
    private maximizeService: MaximizeServiceService,
    private sideMenuService: SideMenuService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.maximizeService.getIsMaximized().subscribe((value: boolean) => {
      this.isMaximized = value;
    });
    this.sideMenuService.getIsRetracted().subscribe((value: boolean) => {
      this.isRetracted = value;
    });
  }

  loadImage(event) {
    if (!this.image) {
      this.notificationService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'You can resize the image using the grab on the bottom right!',
      });
    }

    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addBox() {
    this.boxArray.push(this.boxCount++);
  }
}

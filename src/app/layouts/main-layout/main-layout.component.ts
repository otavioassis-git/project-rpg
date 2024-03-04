import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../core/services/notification.service';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  showContent = true;
  showMenus = true;

  constructor(
    private messageService: MessageService,
    private notificationService: NotificationService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.notificationService.get().subscribe((value) => {
      if (value) this.messageService.add(value);
    });
    this.settingsService.getReloadContent().subscribe((value) => {
      if (value) {
        this.showContent = false;
        setTimeout(() => {
          this.showContent = true;
          this.settingsService.reloadContent(false);
        }, 1);
      }
    });
    this.showMenus = !window.location.hash.includes('#/map-projection');
  }
}

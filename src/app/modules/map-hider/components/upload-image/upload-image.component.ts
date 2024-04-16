import { MapHiderService } from './../../services/map-hider.service';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Image } from '../image-list/image-list.component';
import { take } from 'rxjs';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  image: Image;
  newName: string = '';

  isLoading = false;

  constructor(
    private ref: DynamicDialogRef,
    config: DynamicDialogConfig,
    private mapHiderService: MapHiderService,
    private notificationService: NotificationService
  ) {
    this.image = config.data.image;
  }

  uploadImageToAccount() {
    this.isLoading = true;

    if (this.newName) {
      this.image.name = this.newName;
    }

    this.mapHiderService
      .uploadImageToAccount(this.image)
      .pipe(take(1))
      .subscribe((value) => {
        this.notificationService.add({
          severity: 'success',
          summary: 'Image uploaded',
        });
        this.close(true);
      });
  }

  close(reload: boolean) {
    this.ref.close(reload);
  }
}

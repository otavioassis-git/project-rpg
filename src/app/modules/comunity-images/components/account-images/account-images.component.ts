import { MapHiderService } from './../../../map-hider/services/map-hider.service';
import { NotificationService } from './../../../../core/services/notification.service';
import { Subscription, take } from 'rxjs';
import { ComunityImagesService } from './../../services/comunity-images.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AccountImage } from '../../../map-hider/components/image-list/image-list.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-account-images',
  templateUrl: './account-images.component.html',
  styleUrls: ['./account-images.component.scss'],
  providers: [DialogService],
})
export class AccountImagesComponent implements OnInit, OnDestroy {
  @ViewChild('op') op: OverlayPanel;

  showAccountImages: boolean = false;
  subscription: Subscription;
  images: AccountImage[] = [];
  imagePreview: string;

  isLoading = false;
  constructor(
    private comunityImagesService: ComunityImagesService,
    private notificationService: NotificationService,
    private dialog: DialogService,
    private mapHiderService: MapHiderService
  ) {}

  ngOnInit(): void {
    this.subscription = this.comunityImagesService
      .getShowAccountImages()
      .subscribe((value) => {
        this.showAccountImages = value;
        if (value) this.loadAccountImages();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadAccountImages() {
    this.isLoading = true;
    this.mapHiderService
      .getAccountImages()
      .pipe(take(1))
      .subscribe(
        (value) => {
          this.images = value;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  deleteAccountImage(event: Event, image: AccountImage) {
    event.stopPropagation();
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      header: 'Delete account image',
      data: {
        text: `Delete image <b>${image.name}</b> from account?`,
      },
    });
    ref.onClose.pipe(take(2)).subscribe((response) => {
      if (response) {
        this.mapHiderService
          .deleteAccountImage(image)
          .pipe(take(1))
          .subscribe((value) => {
            this.loadAccountImages();
            this.comunityImagesService.updateImages();
          });
      }
    });
  }

  showImagePreview(event: Event, image: string, show: boolean) {
    this.imagePreview = image;
    if (show) this.op.show(event);
    else this.op.hide();
  }

  copyToClipboard(event: Event, value: string) {
    event.stopPropagation();
    this.notificationService.add({
      severity: 'info',
      summary: 'Copied to clipboard',
    });
    navigator.clipboard.writeText(value);
  }

  close() {
    this.comunityImagesService.setShowAccountImages(false);
  }
}

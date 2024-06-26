import { HttpClient } from '@angular/common/http';
import { NotificationService } from './../../../../core/services/notification.service';
import { MapHiderService } from './../../services/map-hider.service';
import { Subscription, take } from 'rxjs';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Settings } from '../../../../core/services/settings.service';
import { DialogService } from 'primeng/dynamicdialog';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { checkOfflineMode } from '../../../../shared/utils/checkOfflineMode';

export interface Image {
  name: string;
  url: string;
  value: string;
}

export interface AccountImage {
  id: number;
  name: string;
  value: string;
}

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService],
})
export class ImageListComponent implements OnInit, OnDestroy {
  @Output() image = new EventEmitter();

  @ViewChild('op') op: OverlayPanel;

  showImageList: boolean;
  subscription: Subscription;

  imageUrl: string = '';
  imageHistory: Image[] = [];
  accountImages: AccountImage[] = [];
  imagePreview: string;
  isOfflineMode: boolean = false;

  isLoadingAccountImages = false;
  constructor(
    private mapHiderService: MapHiderService,
    private notificationService: NotificationService,
    private httpClient: HttpClient,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.isOfflineMode = checkOfflineMode();
    this.loadImageHistory();
    this.subscription = this.mapHiderService
      .getShowImageList()
      .subscribe((value) => {
        this.showImageList = value;
        if (value) {
          if (!this.isOfflineMode) this.loadAccountImages();
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadAccountImages() {
    this.isLoadingAccountImages = true;
    this.mapHiderService
      .getAccountImages()
      .pipe(take(1))
      .subscribe(
        (value) => {
          this.accountImages = value;
          this.isLoadingAccountImages = false;
        },
        (error) => {
          this.isLoadingAccountImages = false;
        }
      );
  }

  openUploadImageToAccount(event: Event, image: Image) {
    event.stopPropagation();
    const ref = this.dialog.open(UploadImageComponent, {
      header: 'Upload image',
      data: { image },
    });

    ref.onClose.pipe(take(2)).subscribe((reload) => {
      if (reload) {
        this.loadAccountImages();

        const index = this.imageHistory.findIndex(
          (item) => item.value == image.value
        );
        if (index >= 0) {
          this.imageHistory.splice(index, 1);
        }
        this.mapHiderService.saveImageHistory(this.imageHistory);
      }
    });
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
          });
      }
    });
  }

  loadImageHistory() {
    this.httpClient
      .get('assets/image-history.json')
      .pipe(take(1))
      .subscribe((value: any) => {
        this.imageHistory = value;
        const settings: Settings = JSON.parse(localStorage.getItem('settings'));
        if (settings) {
          const fill = settings.imageHistoryFill;
          if (this.imageHistory.length > 0 && fill)
            this.image.emit(this.imageHistory[0].value);
        }
      });
  }

  checkImageInAccount(image: Image) {
    for (let aimage of this.accountImages) {
      if (image.value === aimage.value) return true;
    }
    return false;
  }

  loadLocalImage(event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const image = reader.result as string;
      this.image.emit(image);
      this.close();
      this.updateImageHistory({
        name: file.name,
        url: file.path,
        value: image,
      });
    };
    reader.readAsDataURL(file);
  }

  loadImageURL() {
    const name = this.imageUrl.slice(
      this.imageUrl.lastIndexOf('/'),
      this.imageUrl.length
    );

    this.updateImageHistory({
      name,
      url: this.imageUrl,
      value: this.imageUrl,
    });

    this.image.emit(this.imageUrl);
    this.close();
  }

  loadImage(image: Image | AccountImage) {
    const imageTest = image as Image;
    if (imageTest.url) this.updateImageHistory(imageTest);
    this.image.emit(image.value);
    this.close();
  }

  updateImageHistory(image: Image) {
    const index = this.imageHistory.findIndex(
      (item) => item.value == image.value
    );

    if (index >= 0) {
      this.imageHistory.splice(index, 1);
    } else if (this.imageHistory.length == 10) this.imageHistory.shift();

    this.imageHistory.unshift(image);
    this.mapHiderService.saveImageHistory(this.imageHistory);
  }

  cleanImageHistory() {
    this.imageHistory = [];
    this.mapHiderService.saveImageHistory(this.imageHistory);
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
    this.mapHiderService.setShowImageList(false);
  }
}

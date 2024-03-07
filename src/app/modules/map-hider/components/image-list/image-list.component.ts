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

export interface Image {
  name: string;
  url: string;
  type: 'local' | 'url' | 'account';
  value: string;
}

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageListComponent implements OnInit, OnDestroy {
  @Output() image = new EventEmitter();

  @ViewChild('op') op: OverlayPanel;

  showImageList: boolean;
  subscription: Subscription;

  imageUrl: string = '';
  imageHistory: Image[] = [];
  imagePreview: string;

  constructor(
    private mapHiderService: MapHiderService,
    private notificationService: NotificationService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.subscription = this.mapHiderService
      .getShowImageList()
      .subscribe((value) => {
        this.showImageList = value;
        if (value) {
          this.loadImageHistory();
        }
      });
    if (localStorage.getItem('image-history'))
      this.imageHistory = JSON.parse(localStorage.getItem('image-history'));
  }

  loadImageHistory() {
    this.httpClient
      .get('assets/image-history.json')
      .pipe(take(1))
      .subscribe((value: any) => {
        this.imageHistory = value;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
        type: 'local',
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
      type: 'url',
      value: this.imageUrl,
    });

    this.image.emit(this.imageUrl);
    this.close();
  }

  loadFromImageHistory(image: Image) {
    this.updateImageHistory(image, true);
    this.image.emit(image.value);
    this.close();
  }

  updateImageHistory(image: Image, remove?: boolean) {
    if (remove) {
      const index = this.imageHistory.findIndex(
        (item) => item.value == image.value
      );
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

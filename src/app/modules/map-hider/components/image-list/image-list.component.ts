import { MapHiderService } from './../../services/map-hider.service';
import { Subscription } from 'rxjs';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageListComponent implements OnInit, OnDestroy {
  @Output() image = new EventEmitter();

  showImageList: boolean;
  subscription: Subscription;

  imageUrl: string = '';

  constructor(private mapHiderService: MapHiderService) {}

  ngOnInit(): void {
    this.subscription = this.mapHiderService
      .getShowImageList()
      .subscribe((value) => {
        this.showImageList = value;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadLocalImage(event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.image.emit(reader.result as string);
      this.close();
    };
    reader.readAsDataURL(file);
  }

  loadImageURL() {
    this.image.emit(this.imageUrl);
    this.close();
  }

  close() {
    this.mapHiderService.setShowImageList(false);
  }
}

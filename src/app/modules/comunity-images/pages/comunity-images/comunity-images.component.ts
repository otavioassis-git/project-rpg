import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComunityImagesService } from '../../services/comunity-images.service';
import { take, Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { LinkImageComponent } from '../../components/link-image/link-image.component';

export interface ComunityImage {
  id: number;
  value: string;
  name: string;
}

@Component({
  selector: 'app-comunity-images',
  templateUrl: './comunity-images.component.html',
  styleUrls: ['./comunity-images.component.scss'],
  providers: [DialogService],
})
export class ComunityImagesComponent implements OnInit, OnDestroy {
  images: ComunityImage[] = [];
  subscription: Subscription;

  constructor(
    private comunityImagesService: ComunityImagesService,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.subscription = this.comunityImagesService
      .getUpdateImages()
      .subscribe(() => {
        this.getImages();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getImages() {
    this.comunityImagesService
      .getImages()
      .pipe(take(1))
      .subscribe((response) => {
        this.images = response;
      });
  }

  openLinkImage(image: ComunityImage) {
    const ref = this.dialog.open(LinkImageComponent, {
      header: 'Add image',
      data: { image },
    });

    ref.onClose.pipe(take(2)).subscribe((reload) => {
      if (reload) this.getImages();
    });
  }

  openAccountImages() {
    this.comunityImagesService.setShowAccountImages(true);
  }
}

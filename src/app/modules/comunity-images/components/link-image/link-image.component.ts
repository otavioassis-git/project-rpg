import { Component } from '@angular/core';
import { ComunityImage } from '../../pages/comunity-images/comunity-images.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComunityImagesService } from '../../services/comunity-images.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-link-image',
  templateUrl: './link-image.component.html',
  styleUrls: ['./link-image.component.scss'],
})
export class LinkImageComponent {
  image: ComunityImage;
  isLoading: boolean = false;

  constructor(
    private ref: DynamicDialogRef,
    config: DynamicDialogConfig,
    private service: ComunityImagesService
  ) {
    this.image = config.data.image;
  }

  linkImage() {
    this.isLoading = true;
    this.service
      .linkImage(this.image)
      .pipe(take(1))
      .subscribe((response) => {
        this.close(true);
      });
  }

  close(reload: boolean) {
    this.ref.close(reload);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ComunityImage } from '../pages/comunity-images/comunity-images.component';

@Injectable({
  providedIn: 'root',
})
export class ComunityImagesService {
  constructor(private api: ApiService) {}

  getImages() {
    return this.api.get('images/comunity');
  }

  linkImage(image: ComunityImage) {
    return this.api.post('user/images/link', image);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ComunityImage } from '../pages/comunity-images/comunity-images.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunityImagesService {
  showAccountImages = new BehaviorSubject<boolean>(false);
  updateImagesSubject = new BehaviorSubject<boolean>(false);

  constructor(private api: ApiService) {}

  getImages() {
    return this.api.get('images/comunity');
  }

  linkImage(image: ComunityImage) {
    return this.api.post('user/images/link', image);
  }

  getShowAccountImages(): Observable<boolean> {
    return this.showAccountImages;
  }

  setShowAccountImages(value: boolean) {
    this.showAccountImages.next(value);
  }

  getUpdateImages(): Observable<boolean> {
    return this.updateImagesSubject;
  }

  updateImages() {
    this.updateImagesSubject.next(true);
  }
}

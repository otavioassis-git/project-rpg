import { MapHiderService } from './../../services/map-hider.service';
import { ElectronService } from './../../../../core/services/electron/electron.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { resolve } from 'path';
import { take } from 'rxjs';

@Component({
  selector: 'app-map-projection',
  templateUrl: './map-projection.component.html',
  styleUrls: ['./map-projection.component.scss'],
})
export class MapProjectionComponent implements OnInit {
  image;

  constructor(
    private httpClient: HttpClient,
    private service: MapHiderService
  ) {}

  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    this.httpClient
      .get('assets/projection.png', { responseType: 'blob' })
      .pipe(take(1))
      .subscribe((value: any) => {
        this.createImageFromBlob(value);
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.image = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  close() {
    this.service.stopProjection();
  }
}

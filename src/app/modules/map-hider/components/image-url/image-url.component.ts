import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-image-url',
  templateUrl: './image-url.component.html',
  styleUrls: ['./image-url.component.scss'],
})
export class ImageUrlComponent {
  imageUrl = '';

  constructor(private ref: DynamicDialogRef) {}

  submit() {
    this.ref.close(this.imageUrl);
  }

  close() {
    this.ref.close();
  }
}

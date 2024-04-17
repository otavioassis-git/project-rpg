import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunityImagesComponent } from './pages/comunity-images/comunity-images.component';
import { LinkImageComponent } from './components/link-image/link-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ComunityImagesComponent, LinkImageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
  ],
})
export class ComunityImagesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageFinderRoutingModule } from './image-finder-routing.module';
import { ImageFinderComponent } from './pages/image-finder/image-finder.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ImageFinderComponent],
  imports: [CommonModule, ImageFinderRoutingModule, ButtonModule],
})
export class ImageFinderModule {}

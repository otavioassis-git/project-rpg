import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageFinderRoutingModule } from './image-finder-routing.module';
import { ImageFinderComponent } from './pages/image-finder/image-finder.component';


@NgModule({
  declarations: [
    ImageFinderComponent
  ],
  imports: [
    CommonModule,
    ImageFinderRoutingModule
  ]
})
export class ImageFinderModule { }

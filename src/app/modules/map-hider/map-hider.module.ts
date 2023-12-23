import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapHiderRoutingModule } from './map-hider-routing.module';
import { MapHiderComponent } from './pages/map-hider/map-hider.component';
import { CoreModule } from '../../core/core.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ImageUrlComponent } from './components/image-url/image-url.component';
import { InputTextModule } from 'primeng/inputtext';
import { MapProjectionComponent } from './pages/map-projection/map-projection.component';

@NgModule({
  declarations: [MapHiderComponent, ImageUrlComponent, MapProjectionComponent],
  imports: [
    CommonModule,
    MapHiderRoutingModule,
    CoreModule,
    DynamicDialogModule,
    InputTextModule,
  ],
})
export class MapHiderModule {}

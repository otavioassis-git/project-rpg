import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapProjectionRoutingModule } from './map-projection-routing.module';
import { MapProjectionComponent } from './pages/map-projection/map-projection.component';

@NgModule({
  declarations: [MapProjectionComponent],
  imports: [CommonModule, MapProjectionRoutingModule],
})
export class MapProjectionModule {}

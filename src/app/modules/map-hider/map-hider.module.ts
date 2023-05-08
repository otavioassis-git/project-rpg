import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapHiderRoutingModule } from './map-hider-routing.module';
import { MapHiderComponent } from './pages/map-hider/map-hider.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [MapHiderComponent],
  imports: [CommonModule, MapHiderRoutingModule, CoreModule],
})
export class MapHiderModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapHiderRoutingModule } from './map-hider-routing.module';
import { MapHiderComponent } from './pages/map-hider/map-hider.component';


@NgModule({
  declarations: [
    MapHiderComponent
  ],
  imports: [
    CommonModule,
    MapHiderRoutingModule
  ]
})
export class MapHiderModule { }

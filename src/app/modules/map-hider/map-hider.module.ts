import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapHiderRoutingModule } from './map-hider-routing.module';
import { MapHiderComponent } from './pages/map-hider/map-hider.component';
import { CoreModule } from '../../core/core.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ImageUrlComponent } from './components/image-url/image-url.component';
import { InputTextModule } from 'primeng/inputtext';
import { ImageListComponent } from './components/image-list/image-list.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [MapHiderComponent, ImageUrlComponent, ImageListComponent],
  imports: [
    CommonModule,
    MapHiderRoutingModule,
    CoreModule,
    DynamicDialogModule,
    InputTextModule,
    SidebarModule,
  ],
})
export class MapHiderModule {}

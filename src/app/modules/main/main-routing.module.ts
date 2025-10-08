import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWindowComponent } from '../main-window/pages/main-window/main-window.component';
import { MapHiderComponent } from '../map-hider/pages/map-hider/map-hider.component';
import { ImageFinderComponent } from '../image-finder/pages/image-finder/image-finder.component';
import { ComunityImagesComponent } from '../comunity-images/pages/comunity-images/comunity-images.component';

const routes: Routes = [
  {
    path: '',
    component: MainWindowComponent,
    loadChildren: () =>
      import('../main-window/main-window.module').then(
        (m) => m.MainWindowModule
      ),
  },
  {
    path: 'map-hider',
    component: MapHiderComponent,
    loadChildren: () =>
      import('../map-hider/map-hider.module').then((m) => m.MapHiderModule),
  },
  {
    path: 'image-finder',
    component: ImageFinderComponent,
    loadChildren: () =>
      import('../image-finder/image-finder.module').then(
        (m) => m.ImageFinderModule
      ),
  },
  {
    path: 'comunity-images',
    component: ComunityImagesComponent,
    loadChildren: () =>
      import('../comunity-images/comunity-images.module').then(
        (m) => m.ComunityImagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

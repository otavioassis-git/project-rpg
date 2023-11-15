import { MainWindowComponent } from './modules/main-window/pages/main-window/main-window.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { MapHiderComponent } from './modules/map-hider/pages/map-hider/map-hider.component';
import { SoundboardComponent } from './modules/soundboard/pages/soundboard/soundboard.component';
import { ImageFinderComponent } from './modules/image-finder/pages/image-finder/image-finder.component';

const routes: Routes = [
  {
    path: '',
    component: MainWindowComponent,
    loadChildren: () =>
      import('./modules/main-window/main-window.module').then(
        (m) => m.MainWindowModule
      ),
  },
  {
    path: 'map-hider',
    component: MapHiderComponent,
    loadChildren: () =>
      import('./modules/map-hider/map-hider.module').then(
        (m) => m.MapHiderModule
      ),
  },
  {
    path: 'image-finder',
    component: ImageFinderComponent,
    loadChildren: () =>
      import('./modules/image-finder/image-finder.module').then(
        (m) => m.ImageFinderModule
      ),
  },
  {
    path: 'soundboard',
    component: SoundboardComponent,
    loadChildren: () =>
      import('./modules/soundboard/soundboard.module').then(
        (m) => m.SoundboardModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

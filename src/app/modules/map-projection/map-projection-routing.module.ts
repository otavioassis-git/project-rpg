import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapProjectionComponent } from './pages/map-projection/map-projection.component';

const routes: Routes = [
  {
    path: '',
    component: MapProjectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapProjectionRoutingModule {}

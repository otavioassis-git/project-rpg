import { MainWindowComponent } from './modules/main-window/pages/main-window/main-window.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

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
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainWindowRoutingModule } from './main-window-routing.module';
import { MainWindowComponent } from './pages/main-window/main-window.component';

@NgModule({
  declarations: [MainWindowComponent],
  imports: [CommonModule, MainWindowRoutingModule, CoreModule],
})
export class MainWindowModule {}

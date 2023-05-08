import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CustomTitleBarComponent } from './components/custom-title-bar/custom-title-bar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [CustomTitleBarComponent, SideMenuComponent],
  imports: [CommonModule, ButtonModule],
  exports: [
    ButtonModule,
    CustomTitleBarComponent,
    SideMenuComponent,
    TooltipModule,
  ],
})
export class CoreModule {}

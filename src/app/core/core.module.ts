import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CustomTitleBarComponent } from './components/custom-title-bar/custom-title-bar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [CustomTitleBarComponent, SideMenuComponent],
  imports: [CommonModule, ButtonModule],
  exports: [
    ButtonModule,
    CustomTitleBarComponent,
    SideMenuComponent,
    TooltipModule,
    ToastModule,
    DialogModule,
    AccordionModule,
  ],
})
export class CoreModule {}

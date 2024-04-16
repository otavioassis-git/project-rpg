import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CustomTitleBarComponent } from './components/custom-title-bar/custom-title-bar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { SettingsComponent } from './components/settings/settings.component';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [CustomTitleBarComponent, SideMenuComponent, SettingsComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SidebarModule,
    SelectButtonModule,
    FormsModule,
  ],
  exports: [
    ButtonModule,
    CustomTitleBarComponent,
    SideMenuComponent,
    TooltipModule,
    ToastModule,
    DialogModule,
    AccordionModule,
    ToggleButtonModule,
    FormsModule,
  ],
})
export class CoreModule {}

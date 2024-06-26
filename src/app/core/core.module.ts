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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { SettingsComponent } from './components/settings/settings.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccountComponent } from './components/settings/components/account/account.component';
import { PasswordChangeComponent } from './components/settings/components/password-change/password-change.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../shared/shared.module';
import { TutorialsComponent } from './components/settings/components/tutorials/tutorials.component';
import { ImagesComponent } from './components/settings/components/images/images.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CustomTitleBarComponent,
    SideMenuComponent,
    SettingsComponent,
    AccountComponent,
    PasswordChangeComponent,
    TutorialsComponent,
    ImagesComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    SidebarModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SharedModule,
    CheckboxModule,
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

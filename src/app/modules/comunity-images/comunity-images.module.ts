import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunityImagesComponent } from './pages/comunity-images/comunity-images.component';
import { LinkImageComponent } from './components/link-image/link-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../../shared/shared.module';
import { AccountImagesComponent } from './components/account-images/account-images.component';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    ComunityImagesComponent,
    LinkImageComponent,
    AccountImagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    SidebarModule,
    TooltipModule,
    OverlayPanelModule,
    OverlayscrollbarsModule,
    ProgressSpinnerModule,
  ],
})
export class ComunityImagesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CustomTitleBarComponent } from './components/custom-title-bar/custom-title-bar.component';

@NgModule({
  declarations: [CustomTitleBarComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ButtonModule, CustomTitleBarComponent],
})
export class CoreModule {}

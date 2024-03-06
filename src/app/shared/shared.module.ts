import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ButtonModule } from 'primeng/button';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    ConfirmationDialogComponent,
    LoadingButtonComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ConfirmationDialogComponent,
    LoadingButtonComponent,
  ],
})
export class SharedModule {}

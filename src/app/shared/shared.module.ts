import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    ConfirmationDialogComponent,
  ],
  imports: [CommonModule, TranslateModule, FormsModule, ButtonModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ConfirmationDialogComponent,
  ],
})
export class SharedModule {}

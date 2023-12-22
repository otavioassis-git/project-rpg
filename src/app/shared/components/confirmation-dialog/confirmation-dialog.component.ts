import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  text: string = 'Default text.';
  confirm: string = 'Confirm';
  cancel: string = 'Cancel';

  constructor(private ref: DynamicDialogRef, config: DynamicDialogConfig) {
    if (config.data.text) this.text = config.data.text;
    if (config.data.confirm) this.confirm = config.data.confirm;
    if (config.data.cancel) this.cancel = config.data.cancel;
    console.log(config);
  }

  close(confirm: boolean) {
    this.ref.close(confirm);
  }
}

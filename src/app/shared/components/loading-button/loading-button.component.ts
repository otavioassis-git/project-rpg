import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';

type type = 'default' | 'white-background' | 'outlined';
type weight = 'normal' | 'bold';

@Component({
  selector: 'loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent {
  @Input() type: type = 'default';
  @Input() label: string = '';
  @Input() noWrap: boolean = false;
  @Input() fontWeight: weight = 'bold';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() styleClass: string = '';
  @Input() style: string = '';
  @Input() submitValue: any = null;
  @Output() submit = new EventEmitter();

  typeClass: string = '';
  labelColor: string = 'color-white';

  isLowRes: boolean = false;
  subscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    switch (this.type) {
      case 'default':
        break;
      case 'white-background':
        this.typeClass = ' whitebg';
        break;
      case 'outlined':
        this.typeClass = ' p-button-outlined';
        break;
    }

    if (this.type != 'default') this.labelColor = 'color-primary';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleClick() {
    this.submit.emit(this.submitValue);
  }
}

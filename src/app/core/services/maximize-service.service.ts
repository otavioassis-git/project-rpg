import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaximizeServiceService {
  isMaximized = new BehaviorSubject<boolean>(false);

  constructor() {}

  getIsMaximized() {
    return this.isMaximized;
  }

  setIsMaximized(value: boolean) {
    this.isMaximized.next(value);
  }
}

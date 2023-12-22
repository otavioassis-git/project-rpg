import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  isRetracted = new BehaviorSubject<boolean>(false);

  constructor() {}

  getIsRetracted() {
    return this.isRetracted;
  }

  setIsRetracted(value: boolean) {
    this.isRetracted.next(value);
  }
}

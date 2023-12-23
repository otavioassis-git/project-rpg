import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from './electron/electron.service';
import { HttpClient } from '@angular/common/http';

export interface MenuItem {
  icon: string;
  label: string;
  route: string;
  height: number;
}

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

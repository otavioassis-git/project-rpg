import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private $reloadContent = new BehaviorSubject<boolean>(false);
  private $showSettings = new BehaviorSubject<boolean>(false);

  constructor() {}

  getReloadContent(): Observable<boolean> {
    return this.$reloadContent;
  }

  reloadContent(value: boolean) {
    this.$reloadContent.next(value);
  }

  getShowSettings(): Observable<boolean> {
    return this.$showSettings;
  }

  showSettings(value: boolean) {
    this.$showSettings.next(value);
  }
}

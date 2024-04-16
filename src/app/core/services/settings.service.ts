import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElectronService } from './electron/electron.service';

export interface Settings {
  imageHistoryFill: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  imageHistoryFill: false,
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  ipcRenderer: typeof ipcRenderer;
  private $reloadContent = new BehaviorSubject<boolean>(false);
  private $showSettings = new BehaviorSubject<boolean>(false);

  constructor(electron: ElectronService) {
    if (electron.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

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

  toggleDevTools() {
    this.ipcRenderer.send('toggleDevTools');
  }

  getSettings(): Settings {
    const settings: Settings = JSON.parse(localStorage.getItem('settings'));
    return settings ? settings : DEFAULT_SETTINGS;
  }

  saveSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
    this.ipcRenderer.send('saveSettings', settings);
  }
}

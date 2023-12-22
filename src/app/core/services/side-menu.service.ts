import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from './electron/electron.service';
import { HttpClient } from '@angular/common/http';

export interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  ipcRenderer: typeof ipcRenderer;

  isRetracted = new BehaviorSubject<boolean>(false);

  constructor(electron: ElectronService, private httpClient: HttpClient) {
    if (electron.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  getIsRetracted() {
    return this.isRetracted;
  }

  setIsRetracted(value: boolean) {
    this.isRetracted.next(value);
  }

  getSavedRoute() {
    return this.httpClient.get('assets/route.json');
  }

  saveCurrentRoute(route: MenuItem) {
    this.ipcRenderer.send('saveRoute', route);
  }
}

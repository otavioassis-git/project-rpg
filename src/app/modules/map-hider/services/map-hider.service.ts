import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../../core/services';

@Injectable({
  providedIn: 'root',
})
export class MapHiderService {
  ipcRenderer: typeof ipcRenderer;

  constructor(electron: ElectronService) {
    if (electron.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  projectMap(image) {
    this.ipcRenderer.send('projectMap', image);
  }

  stopProjection() {
    this.ipcRenderer.send('stopProjection');
  }
}

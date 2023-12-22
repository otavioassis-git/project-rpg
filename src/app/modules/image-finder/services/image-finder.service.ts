import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from '../../../core/services';

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class ImageFinderService {
  ipcRenderer: typeof ipcRenderer;

  constructor(electron: ElectronService) {
    if (electron.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  // google window manipulation
  openGoogle(bounds: Bounds) {
    this.ipcRenderer.send('openGoogle', bounds);
  }

  closeGoogle() {
    this.ipcRenderer.send('closeGoogle');
  }

  repositionGoogleWindow(bounds: Bounds) {
    this.ipcRenderer.send('repositionGoogleWindow', bounds);
  }
}

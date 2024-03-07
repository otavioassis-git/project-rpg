import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../../core/services';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapHiderService {
  ipcRenderer: typeof ipcRenderer;

  showImageList = new BehaviorSubject<boolean>(false);

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

  getShowImageList(): Observable<boolean> {
    return this.showImageList;
  }

  setShowImageList(value: boolean) {
    this.showImageList.next(value);
  }
}

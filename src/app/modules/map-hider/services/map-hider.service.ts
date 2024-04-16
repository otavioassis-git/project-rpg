import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../../core/services';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AccountImage,
  Image,
} from '../components/image-list/image-list.component';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class MapHiderService {
  ipcRenderer: typeof ipcRenderer;

  showImageList = new BehaviorSubject<boolean>(false);

  constructor(electron: ElectronService, private api: ApiService) {
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

  saveImageHistory(value: (Image | AccountImage)[]) {
    this.ipcRenderer.send('saveImageHistory', value);
  }

  getAccountImages() {
    return this.api.get('user/images');
  }

  uploadImageToAccount(image: Image) {
    const payload = {
      name: image.name,
      value: image.value,
    };
    return this.api.post('user/images', payload);
  }

  deleteAccountImage(image: AccountImage) {
    return this.api.delete(`user/images/${image.id}`);
  }
}

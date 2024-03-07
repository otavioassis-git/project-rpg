import { ipcRenderer } from 'electron';
import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import { HttpClient } from '@angular/common/http';

export interface Tutorials {
  box_tutorial: boolean;
  resize_tutorial: boolean;
  google_tutorial: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  ipcRenderer: typeof ipcRenderer;

  constructor(electron: ElectronService, private httpClient: HttpClient) {
    if (electron.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  saveTutorials(tutorials: Tutorials) {
    this.ipcRenderer.send('saveTutorials', tutorials);
    localStorage.setItem('tutorials', JSON.stringify(tutorials));
  }

  getTutorials(): Tutorials {
    return JSON.parse(localStorage.getItem('tutorials'));
  }

  public getDefaultTutorials(): Tutorials {
    return {
      box_tutorial: true,
      resize_tutorial: true,
      google_tutorial: true,
    };
  }
}

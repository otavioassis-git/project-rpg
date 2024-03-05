import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../../core/services';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

interface AuthResponse {
  success: boolean;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ipcRenderer: typeof ipcRenderer;

  constructor(electron: ElectronService, private api: ApiService) {
    if (electron.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  login(payload: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.api.post('auth/login', payload);
  }

  saveLogin(payload: { email: string; token: string }) {
    this.ipcRenderer.send('saveLogin', payload);
  }

  signin(payload) {
    return this.api.post('auth/signin', payload);
  }
}

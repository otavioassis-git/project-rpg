import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../../core/services';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

interface AuthResponse {
  id: number;
  success: boolean;
  username: string;
  email: string;
  token: string;
}

export interface User {
  id: number | string;
  username: string;
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

  saveLogin(payload: User) {
    localStorage.setItem('user', JSON.stringify(payload));
    this.ipcRenderer.send('saveLogin', payload);
  }

  signin(payload) {
    return this.api.post('auth/signin', payload);
  }

  changePassword(passwords: { password: string; newPassword: string }) {
    const email = JSON.parse(localStorage.getItem('user')).email;
    const payload = {
      email,
      password: passwords.password,
      newPassword: passwords.newPassword,
    };
    return this.api.put('auth/update-password', payload);
  }
}

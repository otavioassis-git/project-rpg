import { ElectronService } from './../../../../core/services/electron/electron.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-env-changer',
  templateUrl: './env-changer.component.html',
  styleUrls: ['./env-changer.component.scss'],
})
export class EnvChangerComponent implements OnInit {
  env: string = '';

  constructor(
    private ref: DynamicDialogRef,
    private electronService: ElectronService
  ) {}

  ngOnInit(): void {
    const customEnv = localStorage.getItem('env');
    this.env = customEnv ? customEnv : '';
  }

  changeEnv() {
    this.electronService.saveEnv({ env: this.env });
    localStorage.setItem('env', this.env);
    this.close();
  }

  close() {
    this.ref.close();
  }
}

import { take } from 'rxjs';
import { MaximizeServiceService } from '../../services/maximize-service.service';
import { ElectronService } from './../../services/electron/electron.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-title-bar',
  templateUrl: './custom-title-bar.component.html',
  styleUrls: ['./custom-title-bar.component.scss'],
})
export class CustomTitleBarComponent implements OnInit {
  title = 'RPG dos acólitos';
  isMaximized: boolean;

  constructor(
    private electron: ElectronService,
    private maximizeService: MaximizeServiceService
  ) {}

  ngOnInit(): void {
    this.maximizeService.getIsMaximized().subscribe((value: boolean) => {
      this.isMaximized = value;
    });
  }

  toggleIsMaximized() {
    this.maximizeService.setIsMaximized(!this.isMaximized);
  }

  minimize() {
    this.electron.minimizeWindow();
  }

  maximize() {
    this.toggleIsMaximized();
    this.electron.toggleWindowSize();
  }

  close() {
    this.electron.closeWindow();
  }
}

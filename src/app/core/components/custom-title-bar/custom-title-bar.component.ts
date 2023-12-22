import { ElectronService } from './../../services/electron/electron.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-title-bar',
  templateUrl: './custom-title-bar.component.html',
  styleUrls: ['./custom-title-bar.component.scss'],
})
export class CustomTitleBarComponent implements OnInit {
  title = 'Project RPG';

  constructor() {}

  ngOnInit(): void {}
}

import { SettingsService } from './../../../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Settings } from '../../../../services/settings.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  fill: boolean = false;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.fill = this.settingsService.getSettings().imageHistoryFill;
  }

  handleFillChange() {
    const settings = this.settingsService.getSettings();
    settings.imageHistoryFill = this.fill;
    this.settingsService.saveSettings(settings);
  }
}

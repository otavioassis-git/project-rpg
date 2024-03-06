import {
  TutorialService,
  Tutorials,
} from './../../../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
})
export class TutorialsComponent implements OnInit {
  stateOptions: { label: string; value: boolean }[] = [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ];
  tutorials: Tutorials;
  tutorialsEnabled = false;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.tutorials = this.tutorialService.getTutorials();
  }

  handleTutorialChange(event) {
    this.tutorials = this.tutorialService.getDefaultTutorials();
    if (!event.value) {
      for (let key of Object.keys(this.tutorials)) {
        this.tutorials[key] = false;
      }
    }
    this.tutorialService.saveTutorials(this.tutorials);
  }
}

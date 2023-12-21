import { TutorialService } from './../../../../core/services/tutorial.service';
import { NotificationService } from './../../../../core/services/notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaximizeServiceService } from '../../../../core/services/maximize-service.service';
import { SideMenuService } from '../../../../core/services/side-menu.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ImageUrlComponent } from '../../components/image-url/image-url.component';
import { take } from 'rxjs';
import { resolve } from 'path';
import { HttpClient } from '@angular/common/http';
import { Tutorials } from '../../../../core/services/tutorial.service';

@Component({
  selector: 'app-map-hider',
  templateUrl: './map-hider.component.html',
  styleUrls: ['./map-hider.component.scss'],
  providers: [DialogService],
  encapsulation: ViewEncapsulation.None,
})
export class MapHiderComponent implements OnInit {
  image;
  isMaximized: boolean;
  isRetracted: boolean;

  imageUrl = '';

  boxArray = [];
  boxCount = 0;

  firstAddBox = true;
  showboxinfo = true;

  tutorials: Tutorials;

  constructor(
    private maximizeService: MaximizeServiceService,
    private sideMenuService: SideMenuService,
    private notificationService: NotificationService,
    private dialog: DialogService,
    private httpClient: HttpClient,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.maximizeService.getIsMaximized().subscribe((value: boolean) => {
      this.isMaximized = value;
    });
    this.sideMenuService.getIsRetracted().subscribe((value: boolean) => {
      this.isRetracted = value;
    });

    this.tutorials = this.tutorialService.getDefaultTutorials();
    this.getTutorials();
  }

  loadImage(event) {
    if (!this.image && this.tutorials.resize_tutorial) {
      this.notificationService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'You can resize the image using the grab on the bottom right!',
      });
      this.tutorials.resize_tutorial = false;
      this.tutorialService.saveTutorials(this.tutorials);
    }

    this.imageUrl = '';

    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  openImageUrl() {
    const ref = this.dialog.open(ImageUrlComponent, {
      header: 'Insert URL',
    });

    ref.onClose.subscribe((value) => {
      if (value) {
        this.image = null;
        this.imageUrl = value;

        if (this.tutorials.resize_tutorial) {
          this.notificationService.add({
            severity: 'info',
            summary: 'Info',
            detail:
              'You can resize the image using the grab on the bottom right!',
          });
          this.tutorials.resize_tutorial = false;
          this.tutorialService.saveTutorials(this.tutorials);
        }
      }
    });
  }

  addBox() {
    this.boxArray.push(this.boxCount++);
  }

  removeBox(box: number) {
    this.boxArray.splice(this.boxArray.indexOf(box), 1);
    if (this.boxArray.length == 0) this.boxCount = 0;
  }

  removeAllBoxes() {
    this.boxArray = [];
    this.boxCount = 0;
  }

  toggleBoxStyle() {
    let resize = document.getElementsByClassName(
      'p-resizable-handle'
    ) as HTMLCollectionOf<HTMLElement>;
    let content = document.getElementsByClassName(
      'p-dialog-content'
    ) as HTMLCollectionOf<HTMLElement>;
    let header = document.getElementsByClassName(
      'p-dialog-header'
    ) as HTMLCollectionOf<HTMLElement>;
    let text = document.getElementsByClassName(
      'p-dialog-content'
    ) as HTMLCollectionOf<HTMLElement>;

    if (!this.showboxinfo) {
      for (let i of [...Array(resize.length).keys()]) {
        resize[i].style.backgroundColor = 'transparent';
      }
      for (let i of [...Array(content.length).keys()]) {
        content[i].style.borderBottom = 'solid 2px black';
        content[i].style.borderLeft = 'solid 2px black';
        content[i].style.borderRight = 'solid 2px black';
      }
      for (let i of [...Array(header.length).keys()]) {
        header[i].style.backgroundColor = 'black';
        header[i].style.borderTop = 'solid 2px black';
        header[i].style.borderLeft = 'solid 2px black';
        header[i].style.borderRight = 'solid 2px black';
      }
      for (let i of [...Array(text.length).keys()]) {
        text[i].style.color = 'black';
      }
    } else {
      for (let i of [...Array(resize.length).keys()]) {
        resize[i].style.backgroundColor = 'red';
      }
      for (let i of [...Array(content.length).keys()]) {
        content[i].style.borderBottom = 'solid 2px red';
        content[i].style.borderLeft = 'solid 2px red';
        content[i].style.borderRight = 'solid 2px red';
      }
      for (let i of [...Array(content.length).keys()]) {
        header[i].style.backgroundColor = 'gray';
        header[i].style.borderTop = 'solid 2px red';
        header[i].style.borderLeft = 'solid 2px red';
        header[i].style.borderRight = 'solid 2px red';
      }
      for (let i of [...Array(text.length).keys()]) {
        text[i].style.color = '#495057';
      }
    }
  }

  checkFirstTime() {
    if (this.firstAddBox && this.tutorials.box_tutorial) {
      this.notificationService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'You can click on the boxes on the box control to remove them!',
      });
      this.tutorials.box_tutorial = false;
      this.tutorialService.saveTutorials(this.tutorials);
      this.firstAddBox = false;
    }
  }

  getTutorials() {
    this.httpClient
      .get('assets/isServe.json')
      .pipe(take(1))
      .subscribe((value: any) => {
        if (value.serve) {
          this.httpClient
            .get('assets/tutorials.json')
            .pipe(take(1))
            .subscribe(
              (value: Tutorials) => {
                this.tutorials = value;
              },
              (error) => {}
            );
        } else {
          try {
            let value: Tutorials = JSON.parse(
              window
                .require('fs')
                .readFileSync(
                  resolve(
                    __dirname,
                    '../',
                    '../',
                    '../',
                    'Project-RPG-common',
                    'tutorials.json'
                  )
                )
            );

            this.tutorials = value;
          } catch (error) {}
        }
      });
  }
}

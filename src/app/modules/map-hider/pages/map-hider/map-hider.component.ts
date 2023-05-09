import { NotificationService } from './../../../../core/services/notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaximizeServiceService } from '../../../../core/services/maximize-service.service';
import { SideMenuService } from '../../../../core/services/side-menu.service';

@Component({
  selector: 'app-map-hider',
  templateUrl: './map-hider.component.html',
  styleUrls: ['./map-hider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapHiderComponent implements OnInit {
  image;
  isMaximized: boolean;
  isRetracted: boolean;

  boxArray = [];
  boxCount = 0;

  firstAddBox = true;
  showboxinfo = true;

  constructor(
    private maximizeService: MaximizeServiceService,
    private sideMenuService: SideMenuService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.maximizeService.getIsMaximized().subscribe((value: boolean) => {
      this.isMaximized = value;
    });
    this.sideMenuService.getIsRetracted().subscribe((value: boolean) => {
      this.isRetracted = value;
    });
  }

  loadImage(event) {
    if (!this.image) {
      this.notificationService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'You can resize the image using the grab on the bottom right!',
      });
    }

    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(file);
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
    if (this.firstAddBox) {
      this.notificationService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'You can click on the boxes on the box control to remove them!',
      });
      this.firstAddBox = false;
    }
  }
}

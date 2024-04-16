import { TutorialService } from './../../../../core/services/tutorial.service';
import { NotificationService } from './../../../../core/services/notification.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SideMenuService } from '../../../../core/services/side-menu.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ImageUrlComponent } from '../../components/image-url/image-url.component';
import { tap } from 'rxjs';
import { Tutorials } from '../../../../core/services/tutorial.service';
import { NgxCaptureService } from 'ngx-capture';
import { MapHiderService } from '../../services/map-hider.service';

@Component({
  selector: 'app-map-hider',
  templateUrl: './map-hider.component.html',
  styleUrls: ['./map-hider.component.scss'],
  providers: [DialogService],
  encapsulation: ViewEncapsulation.None,
})
export class MapHiderComponent implements OnInit, OnDestroy {
  image;
  isRetracted: boolean;

  imageUrl = '';

  boxArray = [];
  boxCount = 0;

  firstAddBox = true;
  showboxinfo = true;

  tutorials: Tutorials;

  constructor(
    private sideMenuService: SideMenuService,
    private notificationService: NotificationService,
    private dialog: DialogService,
    private tutorialService: TutorialService,
    private captureService: NgxCaptureService,
    private service: MapHiderService
  ) {}

  ngOnInit(): void {
    this.sideMenuService.getIsRetracted().subscribe((value: boolean) => {
      this.isRetracted = value;
    });

    this.tutorials = this.tutorialService.getTutorials();
  }

  ngOnDestroy(): void {
    this.service.setShowImageList(false);
  }

  loadImage(value) {
    this.image = value;
    if (this.tutorials.resize_tutorial) {
      this.notificationService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'You can resize the image using the grab on the bottom right!',
      });
      this.tutorials.resize_tutorial = false;
      this.tutorialService.saveTutorials(this.tutorials);
    }
  }

  openImageList() {
    this.service.setShowImageList(true);
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

  projectMap() {
    this.captureService
      .getImage(document.getElementById('map'), true)
      .pipe(
        tap((img) => {
          this.service.projectMap(img);
        })
      )
      .subscribe();
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}

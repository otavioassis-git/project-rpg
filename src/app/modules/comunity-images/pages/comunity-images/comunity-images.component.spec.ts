import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunityImagesComponent } from './comunity-images.component';

describe('ComunityImagesComponent', () => {
  let component: ComunityImagesComponent;
  let fixture: ComponentFixture<ComunityImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComunityImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunityImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

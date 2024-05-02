import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountImagesComponent } from './account-images.component';

describe('AccountImagesComponent', () => {
  let component: AccountImagesComponent;
  let fixture: ComponentFixture<AccountImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

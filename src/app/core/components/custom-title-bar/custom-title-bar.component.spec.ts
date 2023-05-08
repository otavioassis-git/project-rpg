import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTitleBarComponent } from './custom-title-bar.component';

describe('CustomTitleBarComponent', () => {
  let component: CustomTitleBarComponent;
  let fixture: ComponentFixture<CustomTitleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTitleBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

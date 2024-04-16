import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvChangerComponent } from './env-changer.component';

describe('EnvChangerComponent', () => {
  let component: EnvChangerComponent;
  let fixture: ComponentFixture<EnvChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvChangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

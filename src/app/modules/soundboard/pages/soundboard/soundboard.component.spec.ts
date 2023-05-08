import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundboardComponent } from './soundboard.component';

describe('SoundboardComponent', () => {
  let component: SoundboardComponent;
  let fixture: ComponentFixture<SoundboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

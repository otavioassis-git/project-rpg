import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHiderComponent } from './map-hider.component';

describe('MapHiderComponent', () => {
  let component: MapHiderComponent;
  let fixture: ComponentFixture<MapHiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapHiderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapHiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

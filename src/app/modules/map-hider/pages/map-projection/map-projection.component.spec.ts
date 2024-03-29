import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapProjectionComponent } from './map-projection.component';

describe('MapProjectionComponent', () => {
  let component: MapProjectionComponent;
  let fixture: ComponentFixture<MapProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapProjectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

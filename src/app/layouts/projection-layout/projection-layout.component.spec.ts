import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionLayoutComponent } from './projection-layout.component';

describe('ProjectionLayoutComponent', () => {
  let component: ProjectionLayoutComponent;
  let fixture: ComponentFixture<ProjectionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MapHiderService } from './map-hider.service';

describe('MapHiderService', () => {
  let service: MapHiderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapHiderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

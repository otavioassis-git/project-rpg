import { TestBed } from '@angular/core/testing';

import { ImageFinderService } from './image-finder.service';

describe('ImageFinderService', () => {
  let service: ImageFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

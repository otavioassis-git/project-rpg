import { TestBed } from '@angular/core/testing';

import { ComunityImagesService } from './comunity-images.service';

describe('ComunityImagesService', () => {
  let service: ComunityImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunityImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

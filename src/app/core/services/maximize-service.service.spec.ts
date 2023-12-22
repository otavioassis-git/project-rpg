import { TestBed } from '@angular/core/testing';

import { MaximizeServiceService } from './maximize-service.service';

describe('MaximizeServiceService', () => {
  let service: MaximizeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaximizeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

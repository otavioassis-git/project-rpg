import { TestBed } from '@angular/core/testing';

import { ApiTokenInterceptor } from './apiToken.interceptor';

describe('ApiInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ApiTokenInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ApiTokenInterceptor =
      TestBed.inject(ApiTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

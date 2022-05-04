import { TestBed } from '@angular/core/testing';

import { FirebaseInterceptorService } from './firebase-interceptor.service';

describe('FirebaseInterceptorService', () => {
  let service: FirebaseInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

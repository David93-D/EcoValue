import { TestBed } from '@angular/core/testing';

import { FundamentalesValoresService } from './fundamentales-valores.service';

describe('FundamentalesValoresService', () => {
  let service: FundamentalesValoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundamentalesValoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

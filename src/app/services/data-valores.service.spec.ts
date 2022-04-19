import { TestBed } from '@angular/core/testing';

import { DataValoresService } from './data-valores.service';

describe('DataValoresService', () => {
  let service: DataValoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataValoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

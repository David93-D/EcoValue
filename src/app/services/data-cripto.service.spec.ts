import { TestBed } from '@angular/core/testing';

import { DataCriptoService } from './data-cripto.service';

describe('DataCriptoService', () => {
  let service: DataCriptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCriptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

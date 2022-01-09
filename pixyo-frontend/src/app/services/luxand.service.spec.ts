import { TestBed } from '@angular/core/testing';

import { LuxandService } from './luxand.service';

describe('LuxandService', () => {
  let service: LuxandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuxandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

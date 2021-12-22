import { TestBed } from '@angular/core/testing';

import { PicServiceService } from './pic-service.service';

describe('PicServiceService', () => {
  let service: PicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

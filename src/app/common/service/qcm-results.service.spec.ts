import { TestBed } from '@angular/core/testing';

import { QcmResultsService } from './qcm-results.service';

describe('QcmResultsService', () => {
  let service: QcmResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QcmResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

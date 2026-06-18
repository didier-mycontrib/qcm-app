import { TestBed } from '@angular/core/testing';

import { GenericMapCacheDataService } from './generic-map-cache-data.service';

describe('GenericMapCacheDataService', () => {
  let service: GenericMapCacheDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericMapCacheDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DatalocalService } from './datalocal.service';

describe('DatalocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatalocalService = TestBed.get(DatalocalService);
    expect(service).toBeTruthy();
  });
});

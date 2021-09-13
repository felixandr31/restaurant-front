import { TestBed } from '@angular/core/testing';

import { CookService } from './cook.service';

describe('CookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookService = TestBed.get(CookService);
    expect(service).toBeTruthy();
  });
});

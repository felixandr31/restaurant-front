import { TestBed } from '@angular/core/testing';

import { BookingObsService } from './booking-obs.service';

describe('BookingObsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingObsService = TestBed.get(BookingObsService);
    expect(service).toBeTruthy();
  });
});

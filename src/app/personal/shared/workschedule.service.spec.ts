import { TestBed } from '@angular/core/testing';

import { WorkscheduleService } from './workschedule.service';

describe('WorkscheduleService', () => {
  let service: WorkscheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkscheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

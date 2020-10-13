import { TestBed } from '@angular/core/testing';

import { ClientdetailsService } from './clientdetails.service';

describe('ClientdetailsService', () => {
  let service: ClientdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

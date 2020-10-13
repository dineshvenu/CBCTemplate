import { TestBed } from '@angular/core/testing';

import { ClientcategoryService } from './clientcategory.service';

describe('ClientcategoryService', () => {
  let service: ClientcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

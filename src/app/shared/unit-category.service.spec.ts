import { TestBed } from '@angular/core/testing';

import { UnitCategoryService } from './unit-category.service';

describe('UnitCategoryService', () => {
  let service: UnitCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

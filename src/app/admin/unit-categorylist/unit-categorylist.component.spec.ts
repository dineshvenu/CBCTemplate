import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitCategorylistComponent } from './unit-categorylist.component';

describe('UnitCategorylistComponent', () => {
  let component: UnitCategorylistComponent;
  let fixture: ComponentFixture<UnitCategorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitCategorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

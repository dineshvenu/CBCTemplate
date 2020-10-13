import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDetailslistComponent } from './sales-detailslist.component';

describe('SalesDetailslistComponent', () => {
  let component: SalesDetailslistComponent;
  let fixture: ComponentFixture<SalesDetailslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDetailslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDetailslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

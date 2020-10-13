import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsepopupComponent } from './usepopup.component';

describe('UsepopupComponent', () => {
  let component: UsepopupComponent;
  let fixture: ComponentFixture<UsepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

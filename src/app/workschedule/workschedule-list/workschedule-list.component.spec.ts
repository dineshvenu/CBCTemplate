import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkscheduleListComponent } from './workschedule-list.component';

describe('WorkscheduleListComponent', () => {
  let component: WorkscheduleListComponent;
  let fixture: ComponentFixture<WorkscheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkscheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkscheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateclientdetailsComponent } from './createclientdetails.component';

describe('CreateclientdetailsComponent', () => {
  let component: CreateclientdetailsComponent;
  let fixture: ComponentFixture<CreateclientdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateclientdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateclientdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

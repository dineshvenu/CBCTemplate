import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdetailsListComponent } from './clientdetails-list.component';

describe('ClientdetailsListComponent', () => {
  let component: ClientdetailsListComponent;
  let fixture: ComponentFixture<ClientdetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientdetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientdetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

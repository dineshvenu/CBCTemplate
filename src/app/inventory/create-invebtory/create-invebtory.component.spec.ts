import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvebtoryComponent } from './create-invebtory.component';

describe('CreateInvebtoryComponent', () => {
  let component: CreateInvebtoryComponent;
  let fixture: ComponentFixture<CreateInvebtoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInvebtoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvebtoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

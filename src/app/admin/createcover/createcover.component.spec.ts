import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecoverComponent } from './createcover.component';

describe('CreatecoverComponent', () => {
  let component: CreatecoverComponent;
  let fixture: ComponentFixture<CreatecoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

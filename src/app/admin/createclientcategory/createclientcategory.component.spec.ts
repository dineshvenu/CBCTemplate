import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateclientcategoryComponent } from './createclientcategory.component';

describe('CreateclientcategoryComponent', () => {
  let component: CreateclientcategoryComponent;
  let fixture: ComponentFixture<CreateclientcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateclientcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateclientcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

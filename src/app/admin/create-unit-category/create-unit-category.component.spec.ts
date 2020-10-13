import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUnitCategoryComponent } from './create-unit-category.component';

describe('CreateUnitCategoryComponent', () => {
  let component: CreateUnitCategoryComponent;
  let fixture: ComponentFixture<CreateUnitCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUnitCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUnitCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

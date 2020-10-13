import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CteateautherComponent } from './cteateauther.component';

describe('CteateautherComponent', () => {
  let component: CteateautherComponent;
  let fixture: ComponentFixture<CteateautherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CteateautherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CteateautherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

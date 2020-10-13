import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutherComponent } from './auther.component';

describe('AutherComponent', () => {
  let component: AutherComponent;
  let fixture: ComponentFixture<AutherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

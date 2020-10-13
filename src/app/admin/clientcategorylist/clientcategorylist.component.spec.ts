import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientcategorylistComponent } from './clientcategorylist.component';

describe('ClientcategorylistComponent', () => {
  let component: ClientcategorylistComponent;
  let fixture: ComponentFixture<ClientcategorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientcategorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientcategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

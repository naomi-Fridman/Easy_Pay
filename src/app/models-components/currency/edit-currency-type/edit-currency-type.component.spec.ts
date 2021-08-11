import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurrencyTypeComponent } from './edit-currency-type.component';

describe('EditCurrencyTypeComponent', () => {
  let component: EditCurrencyTypeComponent;
  let fixture: ComponentFixture<EditCurrencyTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCurrencyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCurrencyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

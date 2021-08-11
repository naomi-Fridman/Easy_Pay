import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTypeComponent } from './payments-type.component';

describe('PaymentsTypeComponent', () => {
  let component: PaymentsTypeComponent;
  let fixture: ComponentFixture<PaymentsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

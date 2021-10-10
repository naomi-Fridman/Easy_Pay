import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTryOutComponent } from './form-try-out.component';

describe('FormTryOutComponent', () => {
  let component: FormTryOutComponent;
  let fixture: ComponentFixture<FormTryOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTryOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTryOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

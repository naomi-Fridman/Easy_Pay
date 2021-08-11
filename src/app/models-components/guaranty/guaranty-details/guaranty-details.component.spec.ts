import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantyDetailsComponent } from './guaranty-details.component';

describe('GuarantyDetailsComponent', () => {
  let component: GuarantyDetailsComponent;
  let fixture: ComponentFixture<GuarantyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

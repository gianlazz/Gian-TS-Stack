import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProSignUpPage } from './pro-sign-up.page';

describe('ProSignUpPage', () => {
  let component: ProSignUpPage;
  let fixture: ComponentFixture<ProSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProSignUpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

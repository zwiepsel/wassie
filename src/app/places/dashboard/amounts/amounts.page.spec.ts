import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountsPage } from './amounts.page';

describe('AmountsPage', () => {
  let component: AmountsPage;
  let fixture: ComponentFixture<AmountsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

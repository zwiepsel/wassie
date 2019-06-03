import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmaPage } from './rma.page';

describe('RmaPage', () => {
  let component: RmaPage;
  let fixture: ComponentFixture<RmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

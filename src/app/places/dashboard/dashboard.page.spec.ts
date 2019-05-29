import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dashboardPage } from './dashboard.page';

describe('dashboardPage', () => {
  let component: dashboardPage;
  let fixture: ComponentFixture<dashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

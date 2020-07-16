/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlatListComponent } from './flat-list.component';

describe('FlatListComponent', () => {
  let component: FlatListComponent;
  let fixture: ComponentFixture<FlatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

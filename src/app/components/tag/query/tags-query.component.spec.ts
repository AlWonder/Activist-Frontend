/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TagsQueryComponent } from './tags-query.component';

describe('TagsQueryComponent', () => {
  let component: TagsQueryComponent;
  let fixture: ComponentFixture<TagsQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

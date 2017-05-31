/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormService } from 'app/services/form.service';

import { DownloadTemplateComponent } from './download-template.component';

describe('DownloadTemplateComponent', () => {

  let component: DownloadTemplateComponent;
  let fixture: ComponentFixture<DownloadTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      imports: [ ComponentFixture, FormsModule ],
      providers: [ FormService ],
      declarations: [ DownloadTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

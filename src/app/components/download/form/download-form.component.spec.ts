/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { FormService } from 'app/services/form.service';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';

import { DownloadFormComponent } from './download-form.component';

describe('DownloadTemplateComponent', () => {
  let component: DownloadFormComponent;
  let fixture: ComponentFixture<DownloadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadFormComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        AuthService,
        ApiService,
        FormService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

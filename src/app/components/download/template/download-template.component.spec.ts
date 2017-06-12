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

import { DownloadTemplateComponent } from './download-template.component';

describe('DownloadTemplateComponent', () => {

  let component: DownloadTemplateComponent;
  let fixture: ComponentFixture<DownloadTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        AuthService,
        ApiService,
        FormService
      ],
      declarations: [DownloadTemplateComponent]
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

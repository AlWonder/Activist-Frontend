/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { FormService } from 'app/services/form.service';
import { AuthService } from 'app/services/auth.service';
import { ApiService } from "app/services/api.service";

import { MyFormTemplatesComponent } from './my-form-templates.component';

describe('MyFormTemplatesComponent', () => {
  let component: MyFormTemplatesComponent;
  let fixture: ComponentFixture<MyFormTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        FormsModule
      ],
      providers: [
        AuthService,
        ApiService,
        FormService
      ],
      declarations: [ MyFormTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

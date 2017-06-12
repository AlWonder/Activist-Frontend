/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { EventService } from 'app/services/event.service';
import { AuthService } from 'app/services/auth.service';
import { ApiService } from "app/services/api.service";
import { FormService } from "app/services/form.service";
import { TagService } from 'app/services/tag.service';
import { NotifyService } from "app/services/notify.service";


import { NewEventComponent } from './new-event.component';

describe('NewEventComponent', () => {
  let component: NewEventComponent;
  let fixture: ComponentFixture<NewEventComponent>;

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
        EventService,
        FormService,
        TagService,
        NotifyService
      ],
      declarations: [ NewEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

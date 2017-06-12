/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { EventService } from 'app/services/event.service';
import { AuthService } from 'app/services/auth.service';
import { TagService } from 'app/services/tag.service';
import { ApiService } from "app/services/api.service";
import { NotifyService } from "app/services/notify.service";

import { EditEventComponent } from './edit-event.component';

describe('EditEventComponent', () => {
  let component: EditEventComponent;
  let fixture: ComponentFixture<EditEventComponent>;

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
        TagService,
        NotifyService
      ],
      declarations: [EditEventComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

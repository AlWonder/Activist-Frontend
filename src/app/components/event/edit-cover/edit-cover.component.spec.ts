/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { EventService } from 'app/services/event.service';
import { NotifyService } from 'app/services/notify.service';
import { AuthService } from 'app/services/auth.service';
import { ApiService } from "app/services/api.service";

import { EditCoverComponent } from './edit-cover.component';

describe('EditCoverComponent', () => {
  let component: EditCoverComponent;
  let fixture: ComponentFixture<EditCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        AuthService,
        ApiService,
        EventService,
        NotifyService
      ],
      declarations: [ EditCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

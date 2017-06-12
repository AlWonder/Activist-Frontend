/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { EventService } from 'app/services/event.service';
import { AuthService } from 'app/services/auth.service';
import { ApiService } from "app/services/api.service";
import { NotifyService } from "app/services/notify.service";

import { JoinedUsersComponent } from 'app/components/user/joined-users/joined-users.component';
import { ConfirmComponent } from 'app/components/confirm/confirm.component';

import { ProfileJoinedEventsComponent } from './profile-joined-events.component';

describe('ProfileJoinedEventsComponent', () => {
  let component: ProfileJoinedEventsComponent;
  let fixture: ComponentFixture<ProfileJoinedEventsComponent>;

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
        declarations: [
          ProfileJoinedEventsComponent,
          JoinedUsersComponent,
          ConfirmComponent
        ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileJoinedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

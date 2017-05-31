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

import { ProfileMyEventsComponent } from './profile-my-events.component';
import { JoinedUsersComponent } from 'app/components/user/joined-users/joined-users.component';
import { ConfirmComponent } from 'app/components/confirm/confirm.component';

describe('ProfileMyEventsComponent', () => {
  let component: ProfileMyEventsComponent;
  let fixture: ComponentFixture<ProfileMyEventsComponent>;

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
        ProfileMyEventsComponent,
        JoinedUsersComponent,
        ConfirmComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from 'app/services/auth.service';
import { ApiService } from "app/services/api.service";
import { UserService } from "app/services/user.service";

import { ProfileDashboardComponent } from './profile-dashboard.component';

describe('ProfileDashboardComponent', () => {
  let component: ProfileDashboardComponent;
  let fixture: ComponentFixture<ProfileDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        AuthService,
        ApiService,
        UserService
      ],
      declarations: [ProfileDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

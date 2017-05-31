/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AuthService } from 'app/services/auth.service';
import { ApiService } from "app/services/api.service";
import { UserService } from "app/services/user.service";

import { JoinedUsersComponent } from './joined-users.component';

describe('JoinedUsersComponent', () => {
  let component: JoinedUsersComponent;
  let fixture: ComponentFixture<JoinedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ ApiService, AuthService, UserService ],
      declarations: [ JoinedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

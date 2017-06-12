/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Ng2PaginationModule } from 'ng2-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { EventService } from 'app/services/event.service';
import { ApiService } from "app/services/api.service";

import { EventsComponent } from './events.component';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        Ng2PaginationModule
      ],
      providers: [
        ApiService,
        EventService
      ],
      declarations: [ EventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

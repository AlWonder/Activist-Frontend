/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Ng2PaginationModule } from 'ng2-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { EventService } from 'app/services/event.service';
import { TagService } from 'app/services/tag.service';
import { ApiService } from "app/services/api.service";

import { TagComponent } from './tag.component';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        Ng2PaginationModule
      ],
      providers: [
        ApiService,
        EventService,
        TagService
      ],
      declarations: [ TagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

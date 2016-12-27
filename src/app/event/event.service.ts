import { EVENTS } from '../mocks/events';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Event } from './event';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  //constructor(private http: Http) { }

  getEvents(): Promise<Event[]> {
    return Promise.resolve(EVENTS);
  }

  getEvent(id: number): Promise<Event> {
    return Promise.resolve(EVENTS[id]);
  }
}

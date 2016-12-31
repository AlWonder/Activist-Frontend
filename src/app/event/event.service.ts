import { EVENTS } from '../mocks/events';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Event } from './event';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  constructor(private http: Http) { }

  getEvents() {
    return this.http.get('http://localhost:8080/events')
          .map(response => <Event[]>response.json());
  }

  getEvent(id: number) {
    return this.http.get('http://localhost:8080/events/' + id)
          .map(response => <Event>response.json());
  }
}

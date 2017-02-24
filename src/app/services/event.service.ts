import { Injectable } from '@angular/core';
import { Event } from '../models/event';

import { ApiService } from './api.service';

@Injectable()
export class EventService {

  constructor(private api: ApiService) { }

  public getEvents(page: number) {
    return this.api.get('events', false, { page: page });
  }

  public getEventsByTag(tag: string) {
    return this.api.get('tags/' + tag, false, null);
  }

  public getUserEvents(userId: number) {
    return this.api.get('users/' + userId + '/events', false, null);
  }

  public getJoinedEvents(userId: number) {
    return this.api.get('users/' + userId + '/joined', true, null);
  }

  public getEvent(id: number) {
    return this.api.get("events/" + id, true, null);
  }

  public joinEvent(id: number, data: Object) {
    return this.api.post("events/" + id + "/join", data, true)
  }

  public addEvent(data: Object) {
    return this.api.post("events", data, true);
  }

  public editEvent(data: Object) {
    return this.api.put("events", data);
  }

  public deleteEvent(eventId: number) {
    return this.api.delete("events/" + eventId);
  }

  public denyEvent(eventId: number) {
    return this.api.delete("events/" + eventId + "/join");
  }
}

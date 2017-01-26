import { Injectable } from '@angular/core';
import { Event } from '../models/event';

import { ApiService } from './api.service';

@Injectable()
export class EventService {

  constructor(private api: ApiService) { }

  public getEvents() {
    return this.api.get('events', false, null);
  }

  public getEventsByTag(tag: string) {
    return this.api.get('tags/' + tag, false, null);
  }

  public getUserEvents(userId: number) {
    return this.api.get('users/' + userId + '/events', false, null);
  }

  public getEvent(id: number) {
      return this.api.get("events/" + id, true, null);
  }

  public addEvent(data: Object) {
    return this.api.post("events", data, true)
  }
}

import { Injectable } from '@angular/core';
import { Event } from '../models/event';

import { ApiService } from './api.service';

@Injectable()
export class EventService {

  constructor(private api: ApiService) { }

  getEvents() {
    return this.api.get('events', false);
  }

  getUserEvents(userId: number) {
    return this.api.get('users/' + userId + '/events', false);
  }

  getEvent(id: number) {
      return this.api.get("events/" + id, true);
  }
}

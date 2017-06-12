import { Injectable } from '@angular/core';

import { ApiService } from './';

@Injectable()
export class EventService {

  public coverSrc: string = this.api.apiUrl + "storage/cover/";
  public coverSmSrc: string = this.api.apiUrl + "storage/cover/sm/";

  constructor(private api: ApiService) { }

  public getCover(uri: string) {
    return this.coverSrc + uri;
  }

  public getSmallCover(uri: string) {
    return this.coverSmSrc + uri;
  }

  public indexPage() {
    return this.api.get('index', false, null);
  }

  public getEvents(page: number) {
    return this.api.get('events', false, { page: page });
  }

  public getEventsByTag(tag: string, page: number) {
    return this.api.get('tags/' + tag, false, { page: page });
  }

  public getUserEvents(userId: number) {
    return this.api.get('users/' + userId + '/events', false, null);
  }

  public getJoinedEvents() {
    return this.api.get('events/joined', true, null);
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

  public addCover(id: number, data: Object) {
    return this.api.postFile("events/" + id + "/cover", data, true);
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

  public editCover(data: Object, eventId: number) {
    return this.api.putFile("events/" + eventId + "/cover", data, true);
  }

  public shortifyDescription(description: string, length: number) {
    if (description.length <= length) {
      return description;
    }
    description = description.slice(0, length)
    let a = description.split(' ');
    a.splice(a.length - 1, 1);
    description = a.join(' ');
    return description + '...';
  }
}

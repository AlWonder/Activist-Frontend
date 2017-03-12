import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class UserService {

  constructor(private api: ApiService) { }

  public getJoinedUsers(eventId: number) {
    return this.api.get('events/' + eventId + "/joined", true, null);
  }

  public addAvatar(data: Object) {
    return this.api.postFile("users/avatar", data, true);
  }

}

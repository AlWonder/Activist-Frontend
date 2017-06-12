import { Injectable } from '@angular/core';
import { ApiService } from './';

@Injectable()
export class UserService {

  public avatarSrc: string = this.api.apiUrl + "storage/avatar/";
  public avatarSmSrc: string = this.api.apiUrl + "storage/avatar/sm/";

  constructor(private api: ApiService) { }

  public getAvatar(uri: string) {
    return this.avatarSrc + uri;
  }

  public getSmallAvatar(uri: string) {
    return this.avatarSmSrc + uri;
  }

  public getJoinedUsers(eventId: number) {
    return this.api.get('events/' + eventId + "/joined", true, null);
  }

  public addAvatar(data: Object) {
    return this.api.postFile("users/avatar", data, true);
  }

}

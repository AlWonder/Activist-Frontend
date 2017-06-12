import { Injectable } from '@angular/core';

import { ApiService } from './';

@Injectable()
export class TagService {

  constructor(private api: ApiService) { }

  public queryTags(query: string) {
    if (query) {
      return this.api.get('tags', false, { query: query });
    }
    return this.api.get('tags', false, null);
  }

  public addTagStatus(tag: string, status: boolean) {
      return this.api.post("tags/" + tag + "/status", { status: status }, true);
  }

  public getTagStatus(tag: string) {
    return this.api.get('tags/' + tag + "/status", true, null);
  }

  public deleteTagStatus(tag: string) {
    return this.api.delete('tags/' + tag + "/status");
  }

}

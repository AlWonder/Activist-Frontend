import { Injectable } from '@angular/core';
import { Tag } from '../models/tag';

import { ApiService } from './api.service';

@Injectable()
export class TagService {

  constructor(private api: ApiService) { }

  public queryTags(query: string) {
    if (query) {
      return this.api.get('tags', false, { query: query });
    }
    return this.api.get('tags', false, null);
  }

}

import { Component, OnInit } from '@angular/core';

import { Tag } from 'app/models/tag';
import { TagService } from 'app/services/tag.service';

@Component({
  selector: 'tags-query',
  templateUrl: './tags-query.component.html',
  styleUrls: ['./tags-query.component.css']
})
export class TagsQueryComponent implements OnInit {
  tags: Tag[];
  query: string;

  constructor(private tagService: TagService) { }

  ngOnInit() {
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.queryTags();
    }
  }

  queryTags() {
    this.tagService.queryTags(this.query)
        .subscribe(data => this.tags = data);
  }

}

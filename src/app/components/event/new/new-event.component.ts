import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from 'app/models/event';
import { EventService } from 'app/services/event.service';

import { Tag } from 'app/models/tag';
import { TagService } from 'app/services/tag.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  public tags: any[] = [];

  event: Event = new Event();
  queriedTags: Tag[] = [];
  addedTags: string[];
  tagQuery: string = "";
  volonteursChecked: boolean;

  constructor(private tagService: TagService, private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  toggleVolonteursSwitch() {
    if (this.volonteursChecked) {
      this.volonteursChecked = false;
    } else {
      this.volonteursChecked = true;
    }
  }

  tagKeyUp(event) {
    this.queryTags();
  }

  tagKeyDown(event) {
    event.preventDefault();
    if (this.tagQuery.trim() != "") {
      this.addTag(this.tagQuery.trim());
    }
  }

  queryTags() {
    if (this.tagQuery.trim() != "") {
      this.tagService.queryTags(this.tagQuery.trim())
        .subscribe(data => this.queriedTags = data);
    } else {
      this.queriedTags = [];
    }
  }

  addTag(tag: string) {
    this.tagQuery = "";
    let found: boolean = false;
    for (let addedTag of this.addedTags) {
      if (tag == addedTag) {
        found = true;
        return;
      }
    }
    if (!found) {
      this.addedTags.push(tag);
    }
  }

  removeTag(tag: number) {
    this.addedTags.splice(tag, 1);
  }

  onSubmit(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    } else {
      this.addedTags = [];
      for (let tag of this.tags) {
        this.addedTags.push(tag.value);
      }
      this.eventService.addEvent({ event: this.event, tags: this.addedTags })
        .subscribe(
        response => this.handleResponse(response),
        error => alert("Error: " + error));
    }
  }

  handleResponse(response) {
    if (response.ok) {
      this.router.navigate(['/events/' + response.eventId]);
    }
  }
}

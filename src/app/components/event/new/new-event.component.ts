import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from 'app/models/event';
import { EventService } from 'app/services/event.service';

import { Tag } from 'app/models/tag';
import { TagService } from 'app/services/tag.service';

import { FormService } from 'app/services/form.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  private tags: any[] = [];
  private event: Event = new Event();
  private volunteers: boolean = false;
  private queriedTags: Tag[] = [];
  private addedTags: string[];
  private tagQuery: string = "";
  private cover: File = null;
  private templates: Object;

  constructor(
    private tagService: TagService,
    private eventService: EventService,
    private formService: FormService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.userProfile){
      this.formService.queryUserFormTemplates(this.authService.userProfile.id)
      .subscribe(data => this.templates = data);
    }
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.cover = fileList[0];
    }
  }

  private tagKeyUp(event) {
    this.queryTags();
  }

  private tagKeyDown(event) {
    event.preventDefault();
    if (this.tagQuery.trim() != "") {
      this.addTag(this.tagQuery.trim());
    }
  }

  private queryTags() {
    if (this.tagQuery.trim() != "") {
      this.tagService.queryTags(this.tagQuery.trim())
        .subscribe(data => this.queriedTags = data);
    } else {
      this.queriedTags = [];
    }
  }

  private addTag(tag: string) {
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

  private removeTag(tag: number) {
    this.addedTags.splice(tag, 1);
  }

  private onSubmit(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    } else {
      this.addedTags = [];
      for (let tag of this.tags) {
        this.addedTags.push(tag.value);
      }
      if (this.volunteers = false) {
        this.event.templateId = null;
      }
      this.event.templateId = +this.event.templateId;
      this.eventService.addEvent({ event: this.event, tags: this.addedTags })
        .subscribe(
        response => this.handleResponse(response),
        error => alert("Error: " + error));
    }
  }

  private handleResponse(response: any) {
    if (response.ok) {
      this.event.id = response.eventId;
      if (this.cover != null) {
        let formData = new FormData();
        formData.append("file", this.cover, this.cover.name);
        this.eventService.addCover(response.eventId, formData)
          .subscribe(
          response => { this.router.navigate(['/events/' + this.event.id]); },
          error => alert("Error: " + error));
      } else {
        this.router.navigate(['/events/' + this.event.id]);
      }
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from 'app/services/event.service';
import { AuthService } from 'app/services/auth.service';

import { Event } from 'app/models/event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  private event: Event = new Event();
  private shownTags: any[] = [];
  private tagsBefore: string[] = [];
  private addedTags: string[] = [];
  private removedTags: string[] = [];
  private isTimeSet: boolean;
  private id: number;
  private sub: Subscription;

  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    if (isNaN(this.id)) {
      this.router.navigate(['/404']);
      return;
    }
    this.eventService.getEvent(this.id)
      .subscribe(data => this.handleResponse(data),
      error => this.handleError(error));
  }

  handleResponse(data) {
    this.event = data.event;
    if (data.tags) {
      this.tagsBefore = data.tags;
      for (let tag of data.tags) {
        this.shownTags.push({
          display: tag,
          value: tag
        })
      }
    }
    if (data.isTimeSet == false) {
      this.event.eventTime = null;
    }
    console.log(this.event);
  }

  handleError(error) {
    console.log(error);
    if (error[0].code == 404) {
      this.router.navigate(['/404']);
    }
  }

  onAdd(event) {
    // Delete a tag from removedTags array if that array exists in it
    if (this.removedTags.some(tag => event.value == tag)) {
      var i = this.removedTags.indexOf(event.value, 0);
      this.removedTags.splice(i, 1)
    }
    if (!this.tagsBefore.some(tag => event.value == tag)) {
      this.addedTags.push(event.value);
    }
  }

  onRemove(event) {
    // Delete a tag from removedTags array if that array exists in it
    if (this.addedTags.some(tag => event.value == tag)) {
      var i = this.addedTags.indexOf(event.value, 0);
      this.addedTags.splice(i, 1)
    }
    if (this.tagsBefore.some(tag => event.value == tag)) {
      this.removedTags.push(event.value);
    }
  }

  onSubmit(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    } else {
      this.eventService.editEvent({
        event: this.event,
        addedTags: this.addedTags,
        removedTags: this.removedTags
      })
        .subscribe(
        response => this.handleEditResponse(response),
        error => alert("Error: " + error));
    }
  }

  handleEditResponse(response) {
    if (response.ok) {
      this.router.navigate(['/events/' + response.eventId]);
    }
  }

}

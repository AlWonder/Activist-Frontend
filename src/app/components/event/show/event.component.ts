import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from 'app/services/event.service';
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';
import { Event } from 'app/models/event';
import { User } from 'app/models/user';
import { Tag } from 'app/models/tag'

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  private event: Event;
  private organizer: User;
  private tags: string[];
  private isJoined: boolean;
  private asVolunteer: boolean;
  private hasForm: boolean;
  //private confirm: boolean = false; // I'll make it later
  private id: number;
  private sub: Subscription;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    if (isNaN(this.id)) {
      this.router.navigate(['/404']);
      return;
    }
    this.eventService.getEvent(this.id)
      .subscribe(data => {
        this.event = data.event;
        this.event.description = this.event.description.split('\n');
        this.organizer = data.organizer;
        this.tags = data.tags;
        this.asVolunteer = data.asVolunteer;
        this.isJoined = data.isJoined;
      },
      error => this.handleError(error));
  }

  joinAsActivist() {
    this.eventService.joinEvent(this.id, { asvolunteer: false })
      .subscribe(response => this.handleActivistResponse(response));
  }

  joinAsvolunteer() {
    this.eventService.joinEvent(this.id, { asvolunteer: true })
      .subscribe(data => this.handleVolunteerResponse(data));
  }

  denyEvent() {
    this.eventService.denyEvent(this.id)
      .subscribe(response => this.handleDenyResponse(response));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleVolunteerResponse(data: any) {
    if (data.hasForm) {
      this.isJoined = true;
      this.asVolunteer = true;
      this.hasForm = true;
    } else {
      this.isJoined = true;
      this.asVolunteer = true;
      this.hasForm = false;
    }
  }

  handleActivistResponse(response: any) {
    if (response.ok) {
      this.isJoined = true;
      this.asVolunteer = false;
    }
  }

  handleDenyResponse(response: any) {
    if (response.ok) {
      this.isJoined = false;
    }
  }

  handleError(error) {
    console.log(error);
    if (error[0].code == 404) {
      this.router.navigate(['/404']);
    }
  }
}

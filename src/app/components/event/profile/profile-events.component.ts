import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { EventService } from 'app/services/event.service';
import { Event } from 'app/models/event';

@Component({
  selector: 'profile-events',
  templateUrl: './profile-events.component.html',
  styleUrls: ['./profile-events.component.css']
})
export class ProfileEventsComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService, private authService: AuthService) { }

  ngOnInit() {
    this.eventService.getUserEvents(this.authService.userId)
        .subscribe(data => this.events = data);
  }

}

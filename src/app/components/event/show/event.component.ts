import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from 'app/services/event.service';
import { AuthService } from 'app/services/auth.service';
import { Event } from 'app/models/event';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: Event;
  isActivist: boolean;
  isJoined: boolean;
  id: number;

  constructor(private eventService: EventService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.eventService.getEvent(this.id)
        .subscribe(data => { this.event = data.event;
                             this.isActivist = data.isActivist;
                             this.isJoined = data.isJoined;
                           });
  }

}

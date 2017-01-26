import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventService } from 'app/services/event.service';
import { AuthService } from 'app/services/auth.service';
import { Event } from 'app/models/event';
import { Tag } from 'app/models/tag'

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: Event;
  tags: Tag[];
  isActivist: boolean;
  isJoined: boolean;
  isTimeSet: boolean;
  id: number;

  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
    console.log(this.id);
    if (isNaN(this.id)) {
      this.router.navigate(['/404']);
      return;
    }
    this.eventService.getEvent(this.id)
        .subscribe(data => { this.event = data.event;
                             this.tags = data.tags;
                             this.isActivist = data.isActivist;
                             this.isJoined = data.isJoined;
                             this.isTimeSet = data.isTimeSet;
                             console.log(this.event);
                           },
                   error =>  this.handleError(error));
  }

  handleError(error) {
    console.log(error);
    if (error[0].code == 404) {
      this.router.navigate(['/404']);
    }
  }
}

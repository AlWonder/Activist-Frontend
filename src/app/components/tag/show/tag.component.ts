import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventService } from 'app/services/event.service';
import { AuthService } from 'app/services/auth.service';
import { Event } from 'app/models/event';
import { Tag } from 'app/models/tag'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  events: Event[];
  tag: string;

  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.tag = params['tag']; // (+) converts string 'id' to a number
    });

    this.eventService.getEventsByTag(this.tag)
        .subscribe(data => { this.events = data;
                           },
                   error =>  alert(error));
  }

}

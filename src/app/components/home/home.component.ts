import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

import { EventService } from 'app/services/event.service';
import { Event, EventsByTag } from 'app/models/event';
import { Tag } from 'app/models/tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  private soonerEvents: Event[] = [];
  private eventsByTags: EventsByTag[] = [];

  constructor(
    private apiService: ApiService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventService.indexPage()
      .subscribe(response => {
        this.soonerEvents = response.soonerEvents;
        this.eventsByTags = response.eventsByTags;
      });
  }

  shortifyDescription(description: string) {
    if (description.length <= 140) {
      return description;
    }
    description = description.slice(0, 140)
    let a = description.split(' ');
    a.splice(a.length - 1, 1);
    description = a.join(' ');
    return description + '...';
  }

}

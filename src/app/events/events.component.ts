import { Component, OnInit } from '@angular/core';
import { EventService } from '../event/event.service';
import { Event } from '../event/event';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents()
        .subscribe(data => this.events = data);
  }

}

import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Event } from './event';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: Event;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvent(1)
      .then(event => this.event = event);
  }

}

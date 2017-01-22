import { Component, OnInit } from '@angular/core';

import { Event } from 'app/models/event';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  event: Event = new Event();

  constructor() { }

  ngOnInit() {
  }

  createEvent() {

  }
}

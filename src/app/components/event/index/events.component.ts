import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from 'app/services/event.service';
import { Event } from 'app/models/event';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit {
  private events: Event[];
  private count: number;
  private page: number = 1;
  private sub: Subscription;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Мероприятия – Активист");
    this.sub = this.route.params.subscribe(params => {
      this.page = +params['page']; // (+) converts string 'id' to a number
    });
    if (isNaN(this.page)) {
      this.router.navigate(['/404']);
      return;
    }
    this.getPage(this.page);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  changePage(page: number) {
    this.router.navigate(['/events/page', page]);
    this.getPage(page);
  }

  getPage(page: number) {
    this.eventService.getEvents(page)
      .subscribe(data => {
        this.events = data.events;
        this.page = page;
        this.count = data.count
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

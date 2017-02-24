import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from 'app/services/event.service';
import { AuthService } from 'app/services/auth.service';
import { Event } from 'app/models/event';
import { Tag } from 'app/models/tag'

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  private event: Event;
  private tags: string[];
  private isActivist: boolean;
  private isJoined: boolean;
  private isTimeSet: boolean;
  private id: number;
  private sub: Subscription;

  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
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
        this.tags = data.tags;
        this.isActivist = data.isActivist;
        this.isJoined = data.isJoined;
        this.isTimeSet = data.isTimeSet;
        console.log(this.event);
      },
      error => this.handleError(error));
  }

  joinAsActivist() {
    this.eventService.joinEvent(this.id, { asVolonteur: false })
      .subscribe(data => alert(data));
  }

  joinAsVolonteur() {
    this.eventService.joinEvent(this.id, { asVolonteur: true })
      .subscribe(data => this.handleVolonteurResponse(data));
  }

  denyEvent() {
    this.eventService.denyEvent(this.id)
      .subscribe(data => alert(data));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleVolonteurResponse(data: any) {
    if (data.hasForm) {
      alert("Круто!")
    } else {
      alert("У вас ещё нет анкеты волонтёра.")
    }
  }

  handleError(error) {
    console.log(error);
    if (error[0].code == 404) {
      this.router.navigate(['/404']);
    }
  }
}

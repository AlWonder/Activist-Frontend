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
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private event: Event;
  private tags: Tag[];
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

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  handleError(error) {
    console.log(error);
    if (error[0].code == 404) {
      this.router.navigate(['/404']);
    }
  }
}

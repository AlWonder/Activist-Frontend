import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from 'app/services/event.service';
import { TagService } from 'app/services/tag.service';
import { AuthService } from 'app/services/auth.service';
import { Event } from 'app/models/event';
import { Tag } from 'app/models/tag'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  events: Event[];
  tag: string;
  hasStatus: boolean;
  status: boolean;

  constructor(private eventService: EventService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tag = params['tag'];
    });


    if (this.authService.authenticated()) {
      let o1 = this.eventService.getEventsByTag(this.tag);
      let o2 = this.tagService.getTagStatus(this.tag);
      o1.combineLatest(o2)
        .subscribe(data => {
          this.events = data[0];
          this.hasStatus = data[1].hasStatus;
          this.status = data[1].status;
        },
        error => alert(error));
      /*this.tagService.getTagStatus(this.tag)
        .subscribe(data => { this.events = data.status; },
        error => alert(error));*/
    } else {
      this.eventService.getEventsByTag(this.tag)
      .subscribe(data => {
        this.events = data;
      },
      error => alert(error));
    }
  }

  private addTagStatus(favHide: boolean) {
    this.tagService.addTagStatus(this.tag, favHide)
      .subscribe(data => { alert(data) },
      error => alert(error));
  }

  private deleteTagStatus() {
    this.tagService.deleteTagStatus(this.tag)
      .subscribe(data => { alert(data) },
      error => alert(error));
  }


}

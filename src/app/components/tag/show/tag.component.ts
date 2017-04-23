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
  private events: Event[];
  private tag: string;
  private hasStatus: boolean;
  private status: boolean;
  private count: number;
  private page: number = 1;

  constructor(
    private eventService: EventService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tag = params['tag'];
    });

    if (this.authService.authenticated()) {
      let o1 = this.eventService.getEventsByTag(this.tag, this.page);
      let o2 = this.tagService.getTagStatus(this.tag);
      o1.combineLatest(o2)
        .subscribe(data => {
          this.events = data[0].events;
          this.count = data[0].count;
          this.hasStatus = data[1].hasStatus;
          this.status = data[1].status;
        },
        error => alert(error));
      /*this.tagService.getTagStatus(this.tag)
        .subscribe(data => { this.events = data.status; },
        error => alert(error));*/
    } else {
      this.eventService.getEventsByTag(this.tag, this.page)
      .subscribe(data => {
        this.events = data.events;
        this.count = data.count;
      },
      error => alert(error));
    }
  }

  private changePage(page: number) {
    this.router.navigate(['/tags/' + this.tag + '/page', page]);
    this.getPage(page);
  }

  private getPage(page: number) {
    this.eventService.getEventsByTag(this.tag, page)
      .subscribe(data => {
        this.events = data.events;
        this.page = page;
        this.count = data.count
      });
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

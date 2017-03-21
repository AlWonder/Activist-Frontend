import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { EventService } from 'app/services/event.service';
import { Event } from 'app/models/event';

@Component({
  selector: 'app-profile-my-events',
  templateUrl: './profile-my-events.component.html',
  styleUrls: ['./profile-my-events.component.scss']
})
export class ProfileMyEventsComponent implements OnInit {
  events: Event[];
  activeEvent: number = 0;
  private imageSrc: string = "http://localhost:8070/storage/event/";

  constructor(private eventService: EventService, private authService: AuthService) { }

  ngOnInit() {
    this.eventService.getUserEvents(this.authService.userId)
      .subscribe(data => this.events = data);
  }

  public deleteEvent(id: number) {
    if (confirm("Вы действительно хотите удалить мероприятие?")) {
      this.eventService.deleteEvent(id)
        .subscribe(data => console.log(data));
    }
  }

  public makeEventActive(id: number) {
    this.activeEvent = id;
  }

  getCover(uri: string) {
    return this.imageSrc + uri;
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

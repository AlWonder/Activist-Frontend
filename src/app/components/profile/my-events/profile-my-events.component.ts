import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { EventService } from 'app/services/event.service';
import { Event } from 'app/models/event';

@Component({
  selector: 'app-profile-my-events',
  templateUrl: './profile-my-events.component.html',
  styleUrls: ['./profile-my-events.component.css']
})
export class ProfileMyEventsComponent implements OnInit {
  events: Event[];

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
}

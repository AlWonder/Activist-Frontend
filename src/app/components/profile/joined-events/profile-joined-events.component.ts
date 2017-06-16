import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { EventService } from 'app/services/event.service';
import { Event } from 'app/models/event';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-joined-events',
  templateUrl: './profile-joined-events.component.html',
  styleUrls: ['./profile-joined-events.component.scss']
})
export class ProfileJoinedEventsComponent implements OnInit {

  private events: Event[];

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Мои мероприятия – Профиль – Активист");
    this.eventService.getJoinedEvents()
      .subscribe(data => this.events = data);
  }

  private deleteEvent(id: number) {
    if (confirm("Вы действительно хотите удалить мероприятие?")) {
      this.eventService.deleteEvent(id)
        .subscribe(data => console.log(data));
    }
  }

  private denyEvent(id: number) {
    this.eventService.denyEvent(id)
      .subscribe(data => alert(data));
  }

}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from 'app/services/auth.service';
import { EventService } from 'app/services/event.service';
import { NotifyService } from 'app/services/notify.service'

import { Event } from 'app/models/event';

@Component({
  selector: 'app-profile-my-events',
  templateUrl: './profile-my-events.component.html',
  styleUrls: ['./profile-my-events.component.scss']
})
export class ProfileMyEventsComponent implements OnInit {
  private events: Event[];
  private joinedActiveEvent: number = 0;
  private confirmActiveEvent: number = 0;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private notifyService: NotifyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Мои мероприятия – Профиль – Активист");
    this.eventService.getUserEvents(this.authService.userId)
      .subscribe(data => this.events = data);
  }

  private deleteEvent(id: number) {
    if (confirm("Вы действительно хотите удалить мероприятие?")) {
      this.eventService.deleteEvent(id)
        .subscribe(data => console.log(data));
    }
  }

  private activateJoined(id: number) {
    this.joinedActiveEvent = id;
  }

  private showConfirm(id: number) {
    this.confirmActiveEvent = id;
  }

  private handleConfirmEvent(event: boolean, eventId: number, index: number) {
    this.confirmActiveEvent = 0;
    if (event) {
      this.notifyService.emitInfo("Удаляем мероприятие...");
      this.eventService.deleteEvent(eventId)
        .subscribe(response => this.handleDeleteResponse(response, index));
    }
  }

  private handleDeleteResponse(response: any, index: number) {
    if (response.ok) {
      this.notifyService.emitSuccess("Мероприятие успешно удалено.");
      this.events.splice(index, 1);
      return
    }
    this.notifyService.emitError("Не удалось удалить новость.");
  }
}

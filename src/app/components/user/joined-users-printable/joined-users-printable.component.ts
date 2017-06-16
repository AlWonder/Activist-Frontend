import { Component, OnInit } from '@angular/core';
import { EventService, UserService } from 'app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';

import { Event, User, JoinedUser } from 'app/models';

@Component({
  selector: 'app-joined-users-printable',
  templateUrl: './joined-users-printable.component.html',
  styleUrls: ['./joined-users-printable.component.scss']
})
export class JoinedUsersPrintableComponent implements OnInit {

  private eventId: number;
  private event: Event;
  private organizer: User;
  private users: JoinedUser[] = [];
  private id: number;
  private sub: Subscription;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = +params['id']; // (+) converts string 'id' to a number
    });

    Observable.combineLatest(this.eventService.getEvent(this.eventId),
      this.userService.getJoinedUsers(this.eventId))
      .subscribe(data => {
        this.event = data[0].event;
        this.organizer = data[0].organizer;
        this.users = data[1].users;
        this.title.setTitle("Пользователи, участвующие в мероприятии \""
        + this.event.title + "\" – Активист");
      })
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementsByClassName('joined-users-list')[0].innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>${this.event.title}. Список участников</title>
          <style>
          .body {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: 10mm auto;
            border: 1px #D3D3D3 solid;
            border-radius: 5px;
            background: white;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          }

          h1 {
            font-family: 'Times New Roman', Times, serif;
            font-weight: bold;
            text-align: center;
            font-size: 14pt;
          }

          .event-info {
            font-family: 'Times New Roman', Times, serif;
            font-size: 14pt;
            margin-bottom: 21px;
          }

          table {
            border: 1px solid #000;
            border-collapse: collapse;
            width: 100%;
          }

          table th, table td {
            font-size: 14pt;
            font-family: 'Times New Roman', Times, serif;
            border: 1px solid #000;
            padding: 2px;
            text-align: center;
          }

          .subpage {
            padding: 1cm;
            border: 5px red solid;
            height: 257mm;
            outline: 2cm #FFEAEA solid;
          }
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}

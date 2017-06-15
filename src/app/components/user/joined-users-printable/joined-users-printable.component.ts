import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User, JoinedUser } from 'app/models/user';

@Component({
  selector: 'app-joined-users-printable',
  templateUrl: './joined-users-printable.component.html',
  styleUrls: ['./joined-users-printable.component.scss']
})
export class JoinedUsersPrintableComponent implements OnInit {

  private eventId: number;
  private users: JoinedUser[] = [];
  private id: number;
  private sub: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = +params['id']; // (+) converts string 'id' to a number
    });
    this.userService.getJoinedUsers(this.eventId)
      .subscribe(data => { this.users = data.users; });
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementsByClassName('joined-users-list')[0].innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}

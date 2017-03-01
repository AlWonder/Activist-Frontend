import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/services/user.service';

import { User, JoinedUser } from 'app/models/user';

@Component({
  selector: 'joined-users',
  templateUrl: './joined-users.component.html',
  styleUrls: ['./joined-users.component.scss']
})
export class JoinedUsersComponent implements OnInit {

  @Input() eventId: number;
  private users: JoinedUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getJoinedUsers(this.eventId)
    .subscribe(data => { this.users = data.users; });
  }

}

import { Component, OnInit } from '@angular/core';

import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

}

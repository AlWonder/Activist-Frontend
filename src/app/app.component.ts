import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  thing: string;

  public isCollapsed: boolean = false;

  public collapse() {
    console.log(this.isCollapsed);
  }

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.authService.authenticated()) {
      console.log(this.authService.userId);
    }
  }
}

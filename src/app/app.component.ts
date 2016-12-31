import { Component, OnInit, Input } from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginForm: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onLoginButtonPressed(a: boolean) {
    this.loginForm == true ? this.loginForm = false : this.loginForm = true;
    console.log(this.loginForm);
  }

}

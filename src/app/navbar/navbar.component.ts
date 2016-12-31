import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component'

import { UserService } from '../user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  isLoggedIn : boolean;

  constructor(private userService: UserService) { }
  @Output() onLoginButtonPressed = new EventEmitter<boolean>();

  //jwtHelper: JwtHelper = new JwtHelper();

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    /*console.log(
    this.jwtHelper.decodeToken(token),
    this.jwtHelper.getTokenExpirationDate(token),
    this.jwtHelper.isTokenExpired(token)
  );*/
  }

  toggleLogin(event) {
    event.preventDefault();

    this.onLoginButtonPressed.emit(true);
  }

  logout() {
    this.userService.logout();
  }

}

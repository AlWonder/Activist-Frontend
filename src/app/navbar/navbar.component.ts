import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component'

import { UserService } from '../user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginForm = false;
  isLoggedIn : boolean;

  constructor(private userService: UserService) { }

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
    this.loginForm == true ? this.loginForm = false : this.loginForm = true;
  }

  logout() {
    this.userService.logout();
  }

}

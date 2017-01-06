import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component'

import { AuthService } from '../auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  authenticated : boolean;

  constructor(private authService: AuthService) { }
  @Output() onLoginButtonPressed = new EventEmitter<boolean>();

  //jwtHelper: JwtHelper = new JwtHelper();

  ngOnInit() {
    this.authenticated = this.authService.authenticated();
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



}

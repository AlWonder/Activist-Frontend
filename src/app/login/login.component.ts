import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  login(username: string, password: string) {
    this.authService.login(username, password)
                   .subscribe(
                     response  => this.authService.handleResponse(response),
                     error =>  alert("Error: " + error));
  }
}

import { Component } from '@angular/core';

import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  login(username: string, password: string) {
    this.authService.login(username, password)
                   .subscribe(
                     response  => this.authService.handleResponse(response),
                     error =>  alert("Error: " + error));
  }
}

import { Component } from '@angular/core';

import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private loggingIn: boolean = false;
  private error: string = "";

  constructor(
    private authService: AuthService
  ) { }

  private login(email: string, password: string) {
    this.error = "";
    this.loggingIn = true;
    this.authService.login(email, password)
      .subscribe(
      response => this.handleResponse(response),
      error => alert("Error: " + error));
  }

  private handleResponse(response: any) {
    this.loggingIn = false;
    if (response.ok) {
      localStorage.setItem('id_token', response.idToken);
      this.authService.userId = this.authService.getUserId();
      this.authService.getUserInfo()
        .subscribe(
        response => {
          this.authService.saveUserInfo(response);
        },
        error => alert("Error: " + error));
    } else {
      this.error = response.error.userMessage;
    }
  }
}

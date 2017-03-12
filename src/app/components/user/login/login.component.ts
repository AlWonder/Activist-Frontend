import { Component } from '@angular/core';

import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  login(email: string, password: string) {
    this.authService.login(email, password)
      .subscribe(
      response => this.handleResponse(response),
      error => alert("Error: " + error));
  }

  handleResponse(response: any) {
    if (response.errors == null) {
      console.log(response)
      localStorage.setItem('id_token', response.idToken);
      this.authService.userId = this.authService.getUserId();
      this.authService.getUserInfo()
        .subscribe(
        response => {
          this.authService.saveUserInfo(response);
        },
        error => alert("Error: " + error));
    } else {
      for (let error of response.errors) {
        alert(error.userMessage);
      }
    }
  }
}

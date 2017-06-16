import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loggingIn: boolean = false;
  private error: string = "";

  constructor(
    private authService: AuthService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Вход – Активист");
  }

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

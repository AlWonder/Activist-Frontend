import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  private user: User = new User();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Регистрация – Активист");
  }

  private signUp() {
    this.user.gender = +this.user.gender;
    this.authService.signUp(this.user)
      .subscribe(
      response => this.handleResponse(response),
      error => alert("Error: " + error));
  }

  private handleResponse(response: any) {
    if (response.ok) {
        this.router.navigate(['/login']);
      }
  }
}

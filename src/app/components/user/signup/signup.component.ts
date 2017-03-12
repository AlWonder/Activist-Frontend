import { Component, OnInit } from '@angular/core';
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

  user: User = new User();
  avatar: File = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.avatar = fileList[0];
    }
  }

  signUp() {
    this.user.gender = +this.user.gender;
    this.user.group = +this.user.group;
    this.authService.signUp(this.user)
      .subscribe(
      response => this.handleFirstResponse(response),
      error => alert("Error: " + error));
  }

  handleFirstResponse(response: any) {
    if (response.errors == null) {
      console.log(response)
      localStorage.setItem('id_token', response.idToken);
      this.authService.userId = this.authService.getUserId();
      let formData = new FormData();
      formData.append("file", this.avatar, this.avatar.name);
      this.userService.addAvatar(formData)
        .subscribe(
        response => { this.handleSecondResponse(response); },
        error => alert("Error: " + error));
    } else {
      for (let error of response.errors) {
        alert(error.userMessage);
      }
    }
  }

  handleSecondResponse(response: any) {
    if (response.ok) {
      this.authService.getUserInfo()
        .subscribe(
        response => {
          this.authService.saveUserInfo(response);
        },
        error => alert("Error: " + error));
    }
  }
}

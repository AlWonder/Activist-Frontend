import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loginForm: boolean = false;

  thing: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(localStorage.getItem('id_token'));
  }

  toggleLogin() {
    this.loginForm == true ? this.loginForm = false : this.loginForm = true;
    console.log(this.loginForm);
  }

}

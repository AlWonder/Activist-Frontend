import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from './auth.service';

import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  thing: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(this.authService.userProfile);
  }
}

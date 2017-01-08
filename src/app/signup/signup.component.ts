import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private userService: UserService, private router: Router) { }

  model: any = {};

  ngOnInit() {
  }

  onSubmit() {
  this.userService.login(this.model.email, this.model.password).subscribe((result) => {
    console.log(result);
      if (result) {
        this.router.navigate(['']);
      }
    }); }
}

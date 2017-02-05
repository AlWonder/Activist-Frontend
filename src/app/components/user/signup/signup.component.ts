import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/user';

declare var jQuery: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    jQuery("select").selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});
  }

  signUp() {
    this.authService.signUp(this.user)
                   .subscribe(
                     response  => this.authService.handleResponse(response),
                     error =>  alert("Error: " + error));
  }
}

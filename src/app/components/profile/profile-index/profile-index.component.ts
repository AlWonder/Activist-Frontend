import { Component, OnInit } from '@angular/core';

import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.css']
})
export class ProfileIndexComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}

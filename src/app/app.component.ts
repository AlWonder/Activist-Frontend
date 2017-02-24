import { Component, OnInit, Input } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  thing: string;

  public isCollapsed: boolean = false;

  public collapse() {
    console.log(this.isCollapsed);
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.authenticated()) {
      console.log(this.authService.userId);
    }
  }
}

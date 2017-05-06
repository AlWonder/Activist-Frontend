import { Component, OnInit, Input } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NotifyService } from 'app/services/notify.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  error: string = null;
  errorSub: Subscription;

  public isCollapsed: boolean = false;

  public collapse() {
    console.log(this.isCollapsed);
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private notifyService: NotifyService
  ) {
    this.errorSub = notifyService.errorThrowed$.subscribe(
        error => {
          this.showError(error);
          setTimeout(() => { this.hideError(); }, 3000);
      });
    }

  ngOnInit() {
    if (this.authService.authenticated()) {
      console.log(this.authService.userId);
    }
  }

  showError(error: string) {
    this.error = error;
  }

  hideError() {
    this.error = null
  }
}

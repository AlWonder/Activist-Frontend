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

  info: string = null;
  success: string = null;
  error: string = null;
  infoSub: Subscription;
  successSub: Subscription;
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
    this.infoSub = notifyService.infoThrowed$.subscribe(
      info => {
        this.info = info;
        setTimeout(() => { this.info = null; }, 3000);
      });
    this.successSub = notifyService.successThrowed$.subscribe(
      success => {
        this.success = success;
        setTimeout(() => { this.success = null }, 3000);
      });
    this.errorSub = notifyService.errorThrowed$.subscribe(
      error => {
        this.error = error;
        setTimeout(() => { this.error = null; }, 3000);
      });
  }

  ngOnInit() {
    if (this.authService.authenticated()) {
      console.log(this.authService.userId);
    }
  }

  ngOnDestroy() {
    this.infoSub.unsubscribe();
    this.successSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}

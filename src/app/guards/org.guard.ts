import { Injectable }             from '@angular/core';
import { Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }           from '@angular/router';
import { CanActivate }            from '@angular/router';

import { AuthService }            from 'app/services/auth.service';

@Injectable()
export class OrgGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isOrganizer()) {
      return true;
    } else {
      this.router.navigate(['forbidden']);
      return false;
    }
  }
}

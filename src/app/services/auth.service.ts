import { Injectable }      from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { ApiService } from "./api.service";

import { User } from '../models/user';

@Injectable()
export class AuthService {
  //Store profile object in auth class
  userProfile: any;
  userId: number;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router, private http: Http, private api: ApiService) {
    if (!this.authenticated()
      && (localStorage.getItem('id_token') || localStorage.getItem('profile'))) {
      this.logout();
    } else {
      // Set userProfile attribute of already saved profile
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
      this.userId = this.getUserId();
    }
  }

  public login(email, password) {
    return this.api.post("login", { email, password }, false);
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token and profile from localStorage and userProfile object
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate(['/home']);
  }

  public signUp(user: User) {
    return this.api.post("signup", { user }, false);
  }

  public getUserInfo() {
    return this.api.get("users", true, null);
  }

  public saveUserInfo(response: any) {
    localStorage.setItem("profile", JSON.stringify(response.user));
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    this.router.navigate(['/home']);
  }

  public getUserId() {
    if (this.authenticated()) {
      return this.jwtHelper.decodeToken(localStorage.getItem('id_token')).sub;
    }
    return undefined;
  }

  public isOrganizer() {
    return this.userProfile && this.userProfile.group == "2";
  }

  public isActivist() {
    return this.userProfile && this.userProfile.group == "1";
  }
}

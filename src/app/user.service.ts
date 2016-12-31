import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from './models/user';

@Injectable()
export class UserService {
  id: number;
  group: number;

  constructor(private http: Http, private jwtHelper: JwtHelper) { }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        'http://localhost:8080/login',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.setUserParams();
        }

        return res.success;
      });
  }

  setUserParams() {
    let decoded = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'));
    this.id = decoded.id;
    this.group = decoded.group;
    console.log(this.id, this.group);
  }

  getId() {
    return this.id;
  }

  getGroup() {
    return this.group;
  }

  logout() {
    localStorage.removeItem('auth_token');
    console.log("Succesfully logged out");
  }

  isLoggedIn() {
    if (!!localStorage.getItem('auth_token')) {
      console.log(this.jwtHelper.isTokenExpired(localStorage.getItem('auth_token')));
      return !this.jwtHelper.isTokenExpired(localStorage.getItem('auth_token'));
    }
    return false;
  }

}

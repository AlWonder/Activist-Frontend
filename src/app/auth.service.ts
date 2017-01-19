import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { User } from './models/user';

@Injectable()
export class AuthService {
  //Store profile object in auth class
  userProfile: Object;

  constructor(private router: Router, private http: Http) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
  }

  public createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +
      localStorage.getItem("id_token"));
  }

  public login(username, password) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("//localhost:8080/login", { username, password }, options)
                    .map(this.extractData)
                    .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate(['/home']);
  }

  public signUp(user: User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("//localhost:8080/signup", { user }, options)
                    .map(this.extractData)
                    .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }

  public getUserInfo() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });

    return this.http.get("//localhost:8080/users", options)
                    .map(this.extractData)
                    .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }

  public handleResponse(response: any) {
    if ( response.errors == null ) {
      console.log(response)
      localStorage.setItem('id_token', response.idToken);

      this.getUserInfo()
                     .subscribe(
                       response  => this.saveUserInfo(response),
                       error =>  alert("Error: " + error));

      this.router.navigate(['/home']);
    } else {
      for (let error of response.errors) {
        alert(error.userMessage);
      }
    }
  }

  private saveUserInfo(response: any) {
    console.log(JSON.stringify(response.user));
    localStorage.setItem("profile", JSON.stringify(response.user));
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  public isOrganizer() {
  /*return this.userProfile && this.userProfile.user_metadata
    && this.userProfile.user_metadata.group == "2";*/
}
}

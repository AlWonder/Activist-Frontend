import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { User } from './models/user';

// Avoid name not found warnings
declare var Auth0: any;

@Injectable()
export class AuthService {

  auth0 = new Auth0({
    domain: 'alwonder.eu.auth0.com',
    clientID: 'ur6mJO0drrUOhMf9lxPayYnM9ZtGAUPR',
    responseType: 'token',
    callbackURL: 'http://localhost:4200/',
  });

  //Store profile object in auth class
  userProfile: any;

  constructor(private router: Router, private http: Http) {

    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken && result.accessToken) {

      // Fetch profile information and set idToken
      this.auth0.getUserInfo(result.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          alert("GetUserInfo: " + error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        localStorage.setItem('id_token', result.idToken);
        //console.log(this.userProfile);
      });

      this.router.navigate(['/home']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
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

  public handleResponse(response: any) {
    if ( response.errors == null ) {
      console.log(response)
      localStorage.setItem('id_token', response.idToken);
      this.router.navigate(['/home']);
    } else {
      for (let error of response.errors) {
        alert(error.userMessage);
      }
    }
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  public isOrganizer() {
  return this.userProfile && this.userProfile.user_metadata
    && this.userProfile.user_metadata.group == "2";
}
}

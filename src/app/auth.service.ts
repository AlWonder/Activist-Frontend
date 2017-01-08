import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Headers, RequestOptions, Http } from '@angular/http';

import { User } from './models/user';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Avoid name not found warnings
declare var Auth0Lock: any;
declare var Auth0: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock('OJpLcs68G0OymE5F6VDoWHgFfWJJ8V3C', 'alwonder.eu.auth0.com', {});

  auth0 = new Auth0({
    domain: 'alwonder.eu.auth0.com',
    clientID: 'OJpLcs68G0OymE5F6VDoWHgFfWJJ8V3C',
    responseType: 'token',
    callbackURL: 'http://localhost:4200/',
  });

  constructor(private http: Http, private router: Router) {
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.router.navigate(['/Home']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  public login(username, password) {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  }

  /*public signUp(username, password, firstName) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
      firstName: firstName
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });

  }*/

  public signUp(user: User) {
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("https://alwonder.eu.auth0.com/dbconnections/signup", {
      client_id: 'OJpLcs68G0OymE5F6VDoWHgFfWJJ8V3C',
      connection: 'Username-Password-Authentication',
      email: user.email,
      password: user.password,
      user_metadata: {
        first_name: user.firstName,
        second_name: user.secondName,
        last_name: user.lastName,
        gender: user.gender.toString(),
        group: user.group.toString()
      },
    }, options)
    .map(res => res.json())
    .catch((error:any) => { return Observable.throw(error); });
  }
}

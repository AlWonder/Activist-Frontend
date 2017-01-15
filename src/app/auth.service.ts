import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {

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
    this.auth0.login({
      connection: 'Username-Password-Authentication',
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
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate(['/home']);
  }

  public signUp(user: User) {
    this.auth0.signup({
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
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  public isOrganizer() {
  return this.userProfile && this.userProfile.user_metadata
    && this.userProfile.user_metadata.group == "2";
}
}

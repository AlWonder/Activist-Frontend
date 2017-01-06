import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';


import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private http: Http) { }

  ngOnInit() {
  }

  addHero (email: string, password: string, firstName: string, secondName: string, lastName: string, gender: number, group: number) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://localhost:8080/signup", {
      email: email,
      password: password,
      first_name: firstName,
      second_name: secondName,
      last_name: lastName,
      gender: gender,
      user_group: group
    }).subscribe(data => {
                alert('ok');
          }, error => {
              console.log(JSON.stringify(error.json()));
          });;
    console.log('Sent');
  }

}

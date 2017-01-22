import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'app/rxjs-operators';

@Injectable()
export class ApiService {

  apiUrl: string = "http://localhost:8080/"

  constructor(private http: Http) { }

  public get(uri: string, authHeader: boolean) {
    let headers = new Headers();
    if (authHeader && tokenNotExpired()) {
      this.createAuthorizationHeader(headers);
    }
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiUrl + uri, options)
                    .map(this.extractData)
                    .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }

  public post(uri: string, data: Object, authHeader: boolean) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (authHeader && tokenNotExpired()) {
      this.createAuthorizationHeader(headers);
    }
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + uri, data, options)
                    .map(this.extractData)
                    .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  public createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +
      localStorage.getItem("id_token"));
  }

}

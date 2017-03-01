import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Rx";

import 'app/rxjs-operators';

@Injectable()
export class ApiService {

  apiUrl: string = "http://localhost:8070/"

  constructor(private http: Http) { }

  public get(uri: string, authHeader: boolean, params: Object) {
    let headers = new Headers();
    if (authHeader && tokenNotExpired()) {
      this.addAuthorizationHeader(headers);
    }
    let options = new RequestOptions({ headers: headers });
    if (params) {
      let searchParams = new URLSearchParams();
      for (let param in params) {
        if (params.hasOwnProperty(param))
          searchParams.set(param, params[param]);
      }
      options.search = searchParams;
    }

    return this.http.get(this.apiUrl + uri, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }

  public post(uri: string, data: Object, authHeader: boolean) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (authHeader && tokenNotExpired()) {
      this.addAuthorizationHeader(headers);
    }
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + uri, data, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }

  public put(uri: string, data: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (!tokenNotExpired()) {
      return;
    }
    this.addAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.apiUrl + uri, data, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }

  public delete(uri: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (!tokenNotExpired()) {
      return;
    }
    this.addAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.apiUrl + uri, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  public addAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +
      localStorage.getItem("id_token"));
  }

}

import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Rx";

import 'app/rxjs-operators';

@Injectable()
export class ApiService {

  public apiUrl: string = "/api/"

  constructor(private http: Http) { }

  public get(uri: string, authHeader: boolean, params: Object) {
    let headers = new Headers();
    if (authHeader && tokenNotExpired("id_token")) {
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
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getFile(uri: string, authHeader: boolean, params: Object) {
    let headers = new Headers();
    if (authHeader && tokenNotExpired("id_token")) {
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
      .map((res) => res['_body']);
  }

  public post(uri: string, data: Object, authHeader: boolean) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (authHeader && tokenNotExpired("id_token")) {
      this.addAuthorizationHeader(headers);
    }
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + uri, data, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public postFile(uri: string, data: Object, authHeader: boolean) {
    let headers = new Headers({
      //'Content-Type': 'multipart/form-data'
    });
    if (authHeader && tokenNotExpired("id_token")) {
      this.addAuthorizationHeader(headers);
    }
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + uri, data, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public put(uri: string, data: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (!tokenNotExpired("id_token")) {
      return;
    }
    this.addAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.apiUrl + uri, data, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public putFile(uri: string, data: Object, authHeader: boolean) {
    let headers = new Headers({
      //'Content-Type': 'multipart/form-data'
    });
    if (authHeader && tokenNotExpired("id_token")) {
      this.addAuthorizationHeader(headers);
    }
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.apiUrl + uri, data, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public delete(uri: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (!tokenNotExpired("id_token")) {
      return;
    }
    this.addAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.apiUrl + uri, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error || 'Server error'));
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

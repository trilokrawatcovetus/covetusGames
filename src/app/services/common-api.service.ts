import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {



  constructor(private http: HttpClient) { }

  isLoggedIn() {
    let token = localStorage.getItem('g-max-token');
    return token ? true : false;
  }

  createUrl(requestURI: any, args: any) {
    let parameters: any = {};
    if (Object.keys(args).length > 0) {
      for (const key in args) {
        parameters[key] = args[key];
      }
    }
    requestURI = requestURI + '?' + this.toQueryString(parameters); // To covert parameters into query string
    return requestURI;
  }

  private toQueryString(obj: any) {
    const parts = [];
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }
    return parts.join('&');
  }

  allPostMethod(endpoint: string, data: any) {
    return this.http.post(`${environment.base_URL}/${endpoint}`, data);
  }

  allPutMethod(endpoint: string, data: any) {
    return this.http.put(`${environment.base_URL}/${endpoint}`, data);
  }

  allDeleteMethod(endpoint: string, args = {}) {
    let option = {
      body: args
    }
    return this.http.delete(`${environment.base_URL}/${endpoint}`, option);
  }

  allgetMethod(endpoint: string, args = {}) {
    let requestURL = `${environment.base_URL}/${endpoint}`;
    requestURL = this.createUrl(requestURL, args);
    return this.http.get(requestURL);
  }

}

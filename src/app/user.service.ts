import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  baseUrl: string = "http://192.168.16.191:3000";
  private headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(
    private http: Http
  ) { }

  gets(): Promise<any> {
    return this.http.get(`${this.baseUrl}/users`)
      .toPromise()
      .then( response => {
        return response.json().data || response.json();
      })
      .catch( this.handleError );
  }

  // get(): Promise<any> {
  //   return this.http.get(`${this.baseUrl}/users`)
  //     .toPromise()
  //     .then( response => {
  //       return response.json().data || response.json();
  //     })
  //     .catch( this.handleError );
  // }
  public currentUser = {
    name: '',
    flightNumber: '',
    mail: '',
    departure: {
      airport: '',
      sceduledTime: '',
      actualTime: '',
      airline: ''
    }
  }

  post(mail: string, name: string, flightNumber: string, telephone: string): Promise<any> {

    let body = new URLSearchParams();
    body.set('mail', mail);
    body.set('flightNumber', flightNumber);

    this.currentUser.name = name;
    this.currentUser.flightNumber = flightNumber;
    this.currentUser.mail = mail;

    return this.http.post(`${this.baseUrl}/users`, 
      body, {
        headers: this.headers
      }
    )
      .toPromise()
      .then( ( response ) => {
        console.log( response.json().data );
        // this.currentUser.flightNumber = response.json().data
      })
      .catch( this.handleError );
  }

  private handleError(error: any): Promise <any> 
  {
    console.error( 'an error occured: ', error );
    return Promise.reject( error.message || error );
  }

}

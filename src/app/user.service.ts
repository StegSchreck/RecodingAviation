import { PersistenceService, StorageType } from 'angular-persistence';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  baseUrl: string = "http://192.168.16.191:3000";
  private headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(
    private http: Http,
    private persistance: PersistenceService
  ) { }

  get( userId: string ): Promise<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`)
      .toPromise()
      .then( ( response ) => {
        this.setCurrentuser(response)
      })
      .catch( this.handleError );
  }

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
    body.set('name', name);
    body.set('tel', telephone);


    return this.http.post(`${this.baseUrl}/users`, 
      body, {
        headers: this.headers
      }
    )
      .toPromise()
      .then( ( response ) => {
        this.setCurrentuser(response)
      })
      .catch( this.handleError );
  }

  private setCurrentuser( data ) {
    let flightJson = data.json().flightJSON.flights[0]

    this.persistance.set('userid', data.json()._id, {type: StorageType.SESSION})

    this.currentUser = {
      name: data.json().name,
      mail: data.json().mail,
      flightNumber: data.json().flightNumber,
      departure : {
        airport: flightJson.departureAirport,
        actualTime: flightJson.departure.actual,
        airline: flightJson.operatingAirline.name,
        sceduledTime: flightJson.departure.sceduled,
      }
    }
  }

  private handleError(error: any): Promise <any> 
  {
    console.error( 'an error occured: ', error );
    return Promise.reject( error.message || error );
  }

}

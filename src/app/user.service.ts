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
    id: '',
    name: '',
    flightNumber: '',
    mail: '',
    departure: {
      airport: '',
      scheduledTime: '',
      actualTime: '',
      airline: ''
    },
    taskList: []
  }

  toggleTask( taskName, status ): Promise<any> {
    let body = new URLSearchParams();
    let headers = new Headers({'Content-Type': 'application/json'});
    body.set('status', status);
    body.set('userId', this.currentUser.id);
    body.set('taskName', taskName)

    return this.http.post(`${this.baseUrl}/users/schedule/`, 
      body, {'headers': headers})
      .toPromise()
      .then(() => {

      })
      .catch( this.handleError )
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
    let flightJson = data.json().flightJSON

    this.persistance.set('userid', data.json()._id, {type: StorageType.SESSION})

    this.currentUser = {
      id: data.json()._id,
      name: data.json().name,
      mail: data.json().mail,
      flightNumber: data.json().flightNumber,
      departure : {
        airport: flightJson.departureAirport,
        actualTime: flightJson.departure.actual,
        airline: flightJson.operatingAirline.name,
        scheduledTime: flightJson.departure.scheduled,
      },
      taskList: data.json().taskList
    }
  }

  private handleError(error: any): Promise <any> 
  {
    console.error( 'an error occured: ', error );
    return Promise.reject( error.message || error );
  }

}

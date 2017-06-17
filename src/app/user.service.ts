import { PersistenceService, StorageType } from 'angular-persistence';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  // baseUrl: string = "http://192.168.24.30:3000";
  baseUrl: string = "http://192.168.16.191:3000";
  private headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  private mucUrl = "https://api-dev.munich-airport.de/aci-airport-v1/detail/iata";

  constructor(
    private http: Http,
    private persistance: PersistenceService
  ) { }

  getAirportName( shortForm ): Promise<any> {
    let header = new Headers({'X-apiKey': 'd017a45398ba4a8e14b7fe534fb9b54a'})
    return this.http.get(`${this.mucUrl}/${shortForm}/`, {headers: header})
      .toPromise()
      .then( ( resp ) => {

        return resp.json().cityName;
      } )

  }

  get( userId: string ): Promise<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`)
      .toPromise()
      .then( ( response ) => {
        this.setCurrentuser(response)
        console.log('foo')
      })
      .then( () => {
        this.getAirportName(this.currentUser.departure.airport)
          .then( ( name ) => {
            console.log( this.currentUser )
            this.currentUser.departure.airport = name
          })
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

  fetchStores(): Promise<any> {
    return this.http.get(`${this.baseUrl}/services`)
      .toPromise()
      .then( (response) => {
        return response.json().services;
      })
  }

  fetchNotifications(): Promise<any> {
    return this.http.get(`${this.baseUrl}/services`)
      .toPromise()
      .then( (response) => {
        return response.json().services;
      })
  }

  toggleTask( taskName, status ): Promise<any> {
    let body = new URLSearchParams();
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(`${this.baseUrl}/users/schedule/`, 
      {status: status, userId: this.currentUser.id, taskName: taskName}, {'headers': headers})
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
    console.log(data)
    let flightJson = data.json().flightJSON

    this.persistance.set('userid', data.json()._id, {type: StorageType.SESSION})

    console.log( 'user', this.currentUser, flightJson );

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

    this.currentUser.taskList = this.currentUser.taskList.sort((left, right) => {
      console.log(left, right)
      if(left.timeStamp < right.timeStamp)
        return -1
      if(left.timeStamp > right.timeStamp)
        return 1

      return 0
    })

    console.log( this.currentUser.taskList )


  }

  private handleError(error: any): Promise <any> 
  {
    console.error( 'an error occured: ', error );
    return Promise.reject( error.message || error );
  }

}

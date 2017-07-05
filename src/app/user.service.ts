import { PersistenceService, StorageType } from 'angular-persistence';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  // baseUrl: string = "http://local.me:3000";
  baseUrl: string = "http://10.0.104.237:3000";
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
      })
      .then( () => {
        this.getAirportName(this.currentUser.departure.airport)
          .then( ( name ) => {
            this.currentUser.departure.airport = name
          })
      })
  }

  public currentUser = {
    createdAt: '',
    id: '',
    name: '',
    flightNumber: '',
    mail: '',
    departure: {
      airport: '',
      scheduledTime: '',
      actualTime: '',
      airline: '',
      gate: ''
    },
    taskList: [],
  }

  // addSubtask(  ): Promise<any> {
  //   let body = {
  //     timeStamp:
  //   }
  //   return this.http.post()
  // }

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
  }

  private setCurrentuser( data ) {
    let flightJson = data.json().flightJSON

    this.persistance.set('userid', data.json()._id, {type: StorageType.SESSION})


    this.currentUser = {
      createdAt: data.json().Created_date,
      id: data.json()._id,
      name: data.json().name,
      mail: data.json().mail,
      flightNumber: data.json().flightNumber,
      departure : {
        airport: flightJson.departureAirport,
        actualTime: flightJson.departure.actual,
        airline: flightJson.operatingAirline.name,
        scheduledTime: flightJson.departure.scheduled,
        gate: flightJson.departure.gate,
      },
      taskList: data.json().taskList,
    }

    this.currentUser.taskList = this.currentUser.taskList.sort((left, right) => {
      if(left.timeStamp < right.timeStamp)
        return -1
      if(left.timeStamp > right.timeStamp)
        return 1

      return 0
    })



  }

  private handleError(error: any): Promise <any> 
  {
    return Promise.reject( error.message || error );
  }

}

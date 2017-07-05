import { StorageType, PersistenceService } from 'angular-persistence';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  private error;

  ngOnInit() {



    const geoSuccess = function(position) {
      console.log(position);
    };

    const geoError = function(error) {
      console.log('Error occurred. Error code: ' + error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
    };
    const geoOptions = {
      timeout: 5 * 1000,
      enableHighAccuracy: true,
      maximumAge: 5 * 60 * 1000
    };
    window.navigator.geolocation.getCurrentPosition(
      position => { geoSuccess(position); },
      error => { geoError(error); },
      geoOptions
    );



    let userId = this._ps.get('userid', StorageType.SESSION);
    if( userId ) {
      this._us.get(userId)
        .then( (response) => {
          this.router.navigateByUrl('/home');
        })
    }
  }

  private loginForm = {
    email: '',
    tel: '',
    name: '',
    flightNumber: ''
  }

  constructor(
    private router: Router,
    private _us: UserService,
    private _ps: PersistenceService
  ) {
  }

  login() {
    this._us.post(
      this.loginForm.email,
      this.loginForm.name,
      this.loginForm.flightNumber,
      this.loginForm.tel)
      .then( () => {
        this.router.navigateByUrl('/home');
      })
      .catch( ( response ) => {
        this.error = response._body;
      });
  }


}

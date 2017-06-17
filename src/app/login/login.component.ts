import { StorageType, PersistenceService } from 'angular-persistence';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
    console.log('init login')
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
      } )
  }


}

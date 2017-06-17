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
    console.log( userId )
    if( userId ) {
      this._us.get(userId)
        .then( (response) => {
          this.router.navigateByUrl('/home');
        })
    }
  }

  constructor(
    private router: Router,
    private _us: UserService,
    private _ps: PersistenceService
  ) {
  }

  login() {
    this._us.post(
      'matthiasklebe+spam@gmail.com', 
      'Smith',
      'EW1940',
      '')
      .then( () => {
        this.router.navigateByUrl('/home');
      } )
  }


}

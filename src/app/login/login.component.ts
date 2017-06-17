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
  }

  constructor(
    private router: Router,
    private _us: UserService
  ) {
  }

  login() {
    // this.router.navigateByUrl('/home');

    this._us.post()
      .then( () => {
        console.log( 'I am in!' );
      } )
  }


}

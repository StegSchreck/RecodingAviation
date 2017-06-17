import { UserService } from './../user.service';
import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private tasks = [];
  private checkedIn = false;
  private boardingAvailable = false;
  private boarded = false;
  private boardingFinished = false;
  private dateNow;
  private departureTime;

  constructor(
    private _ts: TasksService,
    private _us: UserService
  ) { }

  ngOnInit() {
    this.tasks = this._ts.getTasks();
    this.dateNow = Date.now();

    this._us.get()
      .then( resp => {
        console.log( resp )
      } )
    console.log();

  }

  passSecurityCheck() {
    this.checkedIn = true;
  }



}

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
  private dateNow;
  private departureTime;
  private timeDiff: any;


  private currentUser;

  constructor(
    private _ts: TasksService,
    private _us: UserService
  ) { }

  checkItem( task ) {
    console.log( task );

    this._us.toggleTask(task.name, !task.status)
      .then( () => {
        task.status = !task.status
      })

  }

  ngOnInit() {
    this.tasks = this._ts.getTasks();
    this.dateNow = Date.now();

    this.currentUser = this._us.currentUser
    let scheduled = new Date(this.currentUser.departure.scheduledTime);

    let actual = new Date(this.currentUser.departure.actualTime)

    this.timeDiff = (scheduled.getTime() - actual.getTime()) / 1000 / 60


  }

  passSecurityCheck() {
    // this.checkedIn = true;
  }



}

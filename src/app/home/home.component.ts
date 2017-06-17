import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
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
  private timeToDeparture;

  private stores = [];
  private shownStores = [];

  private checkedIn;

  private timeToSecurity;
  private timeToBoard;

  private airportFullName = ""

  private currentUser;

  constructor(
    private _ts: TasksService,
    private _us: UserService,
    private _ps: PersistenceService,
    private router: Router

  ) { }

  checkItem( task ) {
    console.log( task )
    this._us.toggleTask(task.name, !task.status)
      .then( () => {
        task.status = !task.status

        if( task.status && task.name == "Check-in" ) {
          this.checkedIn = true
        } else if( !task.status && task.name == "Check-in" ) {
          this.checkedIn = false
        }
      })

  }

  addSubtask(store) {
    console.log( store )
  }

  private mainTasks = [];
  private optionalTasks = [];


  ngOnInit() {
    this.tasks = this._ts.getTasks();
    this.dateNow = Date.now();

    if(this.currentUser == undefined) {
      let userId = this._ps.get('userid', StorageType.SESSION);
      this._us.get( userId )
        .then( () => {
          this.currentUser = this._us.currentUser;
          if( this.currentUser.taskList[0].status )
            this.checkedIn = true
        })
    }

    this.currentUser = this._us.currentUser;

    this.currentUser.taskList.forEach(element => {
      console.log( element )
      if( element.mandatory )
        this.mainTasks.push( element )
      else
        this.optionalTasks.push( element )
    });

    this._us.fetchStores()
      .then( ( stores ) => {
        this.stores = stores;
        let temp = true;

        this.shownStores = stores.splice(0, 4)
      });

    let scheduled = new Date(this.currentUser.departure.scheduledTime);
    let actual = new Date(this.currentUser.departure.actualTime)

    this.timeDiff = (scheduled.getTime() - actual.getTime()) / 1000 / 60;
    this.timeToDeparture = Math.abs(Math.round((actual.getTime() - new Date().getTime()) / 1000 / 60) );
  }
}

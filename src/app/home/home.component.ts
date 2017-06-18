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
  private securityPassed;
  private boarded;

  private timeToSecurity;
  private timeToBoard;
  private dateBoarding;
  private dateSecurity;
  private dateCheckin;
  private dateBaggage;

  private airportFullName = ""

  private currentUser;

  constructor(
    private _ts: TasksService,
    private _us: UserService,
    private _ps: PersistenceService,
    private router: Router

  ) { }

  toggleSubtask( task ) {
    this.timeToSecurity += 10;
    task.done = true;
  }



  checkItem( task ) {
    console.log( task )
    this._us.toggleTask(task.name, !task.status)
      .then( () => {
        task.status = !task.status

        if( task.status && task.name == "Check-in" ) {
          this.checkedIn = true
        } else if( !task.status && task.name == "Check-in" ) {
          this.checkedIn = false
        } else if( task.status && task.name == "Security-Check" ) {
          this.securityPassed = true
        } else if( !task.status && task.name == "Security-Check" ) {
          this.securityPassed = false
        } else if( task.status && task.name == "Boarding" ) {
          this.boarded = true
        } else if( !task.status && task.name == "Boarding" ) {
          this.boarded = false
        }
      })

  }

  addSubtask(store) {
    console.log( store );
    this.timeToSecurity -= 10
    this.optionalTasks.push( store );
    this.shownStores = this.shownStores.filter( ( current ) => current.title != store.title);
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
          this.mainTasks = [];
          this.optionalTasks = [];

          this.currentUser.taskList.forEach( item => {
            if( item.mandatory ) {
              console.log( item )
              this.mainTasks.push( item )
            }
            else
              this.optionalTasks.push( item )
          })

          console.log( this.dateNow, new Date(this.mainTasks[1].timeStamp).getTime() );

          this.dateBoarding = new Date(this.mainTasks[2].timeStamp).getTime();
          this.dateSecurity = new Date(this.mainTasks[1].timeStamp).getTime();
          this.dateCheckin = new Date(this.mainTasks[0].timeStamp).getTime();
          this.dateBaggage = new Date(this.mainTasks[3].timeStamp).getTime();

          this.timeToSecurity = Math.round((new Date(this.mainTasks[1].timeStamp).getTime() - this.dateNow) / 1000 / 60);

          if( this.mainTasks[0].status )
            this.checkedIn = true
        })
    }

    this.currentUser = this._us.currentUser;

    console.log( this.currentUser );

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

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

  private showOptions = false;

  private eat = [];
  private shop = [];
  private newspaper = [];
  private souvenir = [];

  private airportFullName = ""



  private currentUser;

  constructor(
    private _ts: TasksService,
    private _us: UserService
  ) { }

  checkItem( task ) {
    this._us.toggleTask(task.name, !task.status)
      .then( () => {
        task.status = !task.status

        if( task.status && task.name == "Check-in" ) {
          this.showOptions = true
        } else if( !task.status && task.name == "Check-in" ) {
          this.showOptions = false
        }
      })

  }


  ngOnInit() {
    this.tasks = this._ts.getTasks();
    this.dateNow = Date.now();

    this._us.fetchStores()
      .then( ( stores ) => {
        this.stores = stores;
        let temp = true;

        this.shownStores = stores.splice(0, 4)

      });


    this.currentUser = this._us.currentUser

    let scheduled = new Date(this.currentUser.departure.scheduledTime);

    let actual = new Date(this.currentUser.departure.actualTime)

    this.timeDiff = (scheduled.getTime() - actual.getTime()) / 1000 / 60;
    this.timeToDeparture = Math.abs(Math.round((actual.getTime() - new Date().getTime()) / 1000 / 60) );
  }
}

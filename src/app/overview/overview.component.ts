import { TasksService } from './../tasks.service';
import { PersistenceService, StorageType } from 'angular-persistence';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  private tasks;
  private dateNow;
  private currentUser;

  private allList;

  constructor(
    private _us: UserService,
    private _ps: PersistenceService,
    private _ts: TasksService
  ) { }

  ngOnInit() {
        this.tasks = this._ts.getTasks();
        this.dateNow = Date.now();

        if(this.currentUser == undefined) {
          let userId = this._ps.get('userid', StorageType.SESSION);
          this._us.get( userId )
            .then( () => {
              this.currentUser = this._us.currentUser;
              this.allList = [...this.currentUser.notificationList, ...this.currentUser.standardTaskList]
            })
        }
  }

}

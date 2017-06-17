import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private tasks = [];

  constructor(private _ts: TasksService) { }

  ngOnInit() {
    this.tasks = this._ts.getTasks();
  }

}
